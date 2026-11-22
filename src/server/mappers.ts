import type { Prisma } from "../generated/prisma";
import type { Track, TrackComment, TrackDetail, UserLite } from "@/types";

export const userLite = { id: true, name: true, username: true, image: true } as const;

export const trackInclude = (viewerId: string | null) =>
  ({
    author: { select: userLite },
    _count: { select: { likes: true, comments: true } },
    likes: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false,
    bookmarks: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false,
  }) satisfies Prisma.PostInclude;

type PostRow = Prisma.PostGetPayload<{ include: ReturnType<typeof trackInclude> }>;

export function toTrack(p: PostRow): Track {
  return {
    id: p.id,
    content: p.content,
    image: p.image,
    createdAt: p.createdAt.toISOString(),
    author: p.author as UserLite,
    likeCount: p._count.likes,
    commentCount: p._count.comments,
    liked: Array.isArray(p.likes) && p.likes.length > 0,
    saved: Array.isArray(p.bookmarks) && p.bookmarks.length > 0,
    isDemo: p.isDemo,
  };
}

type CommentRow = {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author: UserLite;
};

export function toComment(c: CommentRow, viewerId: string | null, postAuthorId: string): TrackComment {
  return {
    id: c.id,
    content: c.content,
    createdAt: c.createdAt.toISOString(),
    author: c.author,
    canDelete: !!viewerId && (c.authorId === viewerId || postAuthorId === viewerId),
  };
}

export function toDetail(
  p: PostRow & { comments: CommentRow[] },
  viewerId: string | null,
): TrackDetail {
  return {
    ...toTrack(p),
    canDelete: !!viewerId && p.authorId === viewerId,
    comments: p.comments.map((c) => toComment(c, viewerId, p.authorId)),
  };
}
