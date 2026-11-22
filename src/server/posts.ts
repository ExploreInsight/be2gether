import { prisma } from "@/lib/prisma";
import { MAX_COMMENT_LENGTH, MAX_POST_LENGTH, PAGE_SIZE } from "@/lib/constants";
import { extractTags } from "@/lib/format";
import type { Page, Side, TagCount, Track, TrackDetail } from "@/types";
import type { Prisma } from "../generated/prisma";
import { HttpError } from "./http";
import { toDetail, toTrack, trackInclude, userLite } from "./mappers";

async function pageOf(
  where: Prisma.PostWhereInput,
  viewerId: string | null,
  cursor: string | null,
  orderBy: Prisma.PostOrderByWithRelationInput[] = [{ createdAt: "desc" }, { id: "desc" }],
): Promise<Page<Track>> {
  const rows = await prisma.post.findMany({
    where,
    orderBy,
    take: PAGE_SIZE + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    include: trackInclude(viewerId),
  });
  const more = rows.length > PAGE_SIZE;
  const items = (more ? rows.slice(0, PAGE_SIZE) : rows).map(toTrack);
  return { items, nextCursor: more ? items[items.length - 1].id : null };
}

export async function getFeed(viewerId: string | null, side: Side, cursor: string | null) {
  if (side === "friends" && viewerId) {
    const following = await prisma.follows.findMany({
      where: { followerId: viewerId },
      select: { followingId: true },
    });
    const ids = [viewerId, ...following.map((f) => f.followingId)];
    return pageOf({ authorId: { in: ids } }, viewerId, cursor);
  }
  return pageOf({}, viewerId, cursor);
}

export async function getSaved(viewerId: string, cursor: string | null) {
  return pageOf({ bookmarks: { some: { userId: viewerId } } }, viewerId, cursor);
}

export async function getUserTracks(
  userId: string,
  viewerId: string | null,
  tab: "posts" | "likes",
  cursor: string | null,
) {
  const where: Prisma.PostWhereInput =
    tab === "likes" ? { likes: { some: { userId } } } : { authorId: userId };
  return pageOf(where, viewerId, cursor);
}

export async function searchTracks(
  viewerId: string | null,
  q: string,
  opts: { hasImage: boolean; sort: "new" | "liked" },
  cursor: string | null,
) {
  const where: Prisma.PostWhereInput = {
    ...(q ? { content: { contains: q, mode: "insensitive" } } : {}),
    ...(opts.hasImage ? { image: { not: null } } : {}),
  };
  const order: Prisma.PostOrderByWithRelationInput[] =
    opts.sort === "liked"
      ? [{ likes: { _count: "desc" } }, { createdAt: "desc" }, { id: "desc" }]
      : [{ createdAt: "desc" }, { id: "desc" }];
  return pageOf(where, viewerId, cursor, order);
}

export async function getTrack(id: string, viewerId: string | null): Promise<TrackDetail> {
  const p = await prisma.post.findUnique({
    where: { id },
    include: {
      ...trackInclude(viewerId),
      comments: { orderBy: { createdAt: "asc" }, include: { author: { select: userLite } } },
    },
  });
  if (!p) throw new HttpError(404, "That post is gone.");
  return toDetail(p, viewerId);
}

export async function createTrack(userId: string, content: string, image: string | null) {
  const text = content.trim();
  if (!text && !image) throw new HttpError(400, "Write something or add a photo.");
  if (text.length > MAX_POST_LENGTH) throw new HttpError(400, `Keep it under ${MAX_POST_LENGTH} characters.`);
  const p = await prisma.post.create({
    data: { authorId: userId, content: text || null, image },
    include: trackInclude(userId),
  });
  return toTrack(p);
}

export async function deleteTrack(id: string, userId: string, isAdmin: boolean) {
  const p = await prisma.post.findUnique({ where: { id }, select: { authorId: true } });
  if (!p) throw new HttpError(404, "That post is gone.");
  if (p.authorId !== userId && !isAdmin) throw new HttpError(403, "You can only delete your own posts.");
  await prisma.post.delete({ where: { id } });
}

export async function toggleLike(postId: string, userId: string) {
  const post = await prisma.post.findUnique({ where: { id: postId }, select: { authorId: true } });
  if (!post) throw new HttpError(404, "That post is gone.");
  const key = { userId_postId: { userId, postId } };
  const existing = await prisma.like.findUnique({ where: key });
  if (existing) {
    await prisma.like.delete({ where: key });
  } else {
    await prisma.$transaction([
      prisma.like.create({ data: { userId, postId } }),
      ...(post.authorId !== userId
        ? [prisma.notification.create({ data: { type: "LIKE", userId: post.authorId, creatorId: userId, postId } })]
        : []),
    ]);
  }
  const likeCount = await prisma.like.count({ where: { postId } });
  return { liked: !existing, likeCount };
}

export async function toggleSave(postId: string, userId: string) {
  const key = { userId_postId: { userId, postId } };
  const existing = await prisma.bookmark.findUnique({ where: key });
  if (existing) await prisma.bookmark.delete({ where: key });
  else await prisma.bookmark.create({ data: { userId, postId } });
  return { saved: !existing };
}

export async function addComment(postId: string, userId: string, content: string) {
  const text = content.trim();
  if (!text) throw new HttpError(400, "Write a reply first.");
  if (text.length > MAX_COMMENT_LENGTH) throw new HttpError(400, `Keep replies under ${MAX_COMMENT_LENGTH} characters.`);
  const post = await prisma.post.findUnique({ where: { id: postId }, select: { authorId: true } });
  if (!post) throw new HttpError(404, "That post is gone.");
  await prisma.$transaction(async (tx) => {
    const c = await tx.comment.create({ data: { content: text, postId, authorId: userId } });
    if (post.authorId !== userId) {
      await tx.notification.create({
        data: { type: "COMMENT", userId: post.authorId, creatorId: userId, postId, commentId: c.id },
      });
    }
  });
}

export async function deleteComment(id: string, userId: string) {
  const c = await prisma.comment.findUnique({
    where: { id },
    select: { authorId: true, post: { select: { authorId: true } } },
  });
  if (!c) throw new HttpError(404, "That reply is gone.");
  if (c.authorId !== userId && c.post.authorId !== userId) throw new HttpError(403, "Not yours to delete.");
  await prisma.comment.delete({ where: { id } });
}

export async function reportTrack(postId: string, userId: string, reason: string) {
  const r = reason.trim().slice(0, 300);
  if (!r) throw new HttpError(400, "Say what is wrong.");
  await prisma.report.upsert({
    where: { postId_reporterId: { postId, reporterId: userId } },
    create: { postId, reporterId: userId, reason: r },
    update: { reason: r, resolved: false },
  });
}

export async function trendingTags(): Promise<TagCount[]> {
  const since = new Date(Date.now() - 14 * 24 * 3600 * 1000);
  const rows = await prisma.post.findMany({
    where: { createdAt: { gte: since }, content: { contains: "#" } },
    select: { content: true },
    take: 400,
    orderBy: { createdAt: "desc" },
  });
  const counts = new Map<string, number>();
  for (const r of rows) for (const t of new Set(extractTags(r.content ?? ""))) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count).slice(0, 8);
}
