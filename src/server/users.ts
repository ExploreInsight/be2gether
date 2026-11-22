import { prisma } from "@/lib/prisma";
import { MAX_BIO_LENGTH } from "@/lib/constants";
import type { PersonRow, Profile } from "@/types";
import { HttpError } from "./http";
import { userLite } from "./mappers";

export async function getProfile(username: string, viewerId: string | null): Promise<Profile> {
  const u = await prisma.user.findUnique({
    where: { username },
    select: {
      ...userLite, bio: true, location: true, website: true, createdAt: true, isDemo: true,
      _count: { select: { followers: true, following: true, posts: true } },
      followers: viewerId ? { where: { followerId: viewerId }, select: { followerId: true } } : false,
    },
  });
  if (!u) throw new HttpError(404, "No one goes by that name here.");
  return {
    id: u.id, name: u.name, username: u.username, image: u.image,
    bio: u.bio, location: u.location, website: u.website, createdAt: u.createdAt.toISOString(),
    followers: u._count.followers, following: u._count.following, posts: u._count.posts,
    isFollowing: Array.isArray(u.followers) && u.followers.length > 0,
    isMe: viewerId === u.id, isDemo: u.isDemo,
  };
}

export async function updateProfile(
  userId: string,
  data: { name?: string; bio?: string; location?: string; website?: string },
) {
  const clean = (v: string | undefined, max: number) => (v === undefined ? undefined : v.trim().slice(0, max) || null);
  const website = clean(data.website, 120);
  if (website && !/^https?:\/\//i.test(website)) throw new HttpError(400, "Website must start with http:// or https://");
  await prisma.user.update({
    where: { id: userId },
    data: { name: clean(data.name, 60), bio: clean(data.bio, MAX_BIO_LENGTH), location: clean(data.location, 60), website },
  });
}

export async function toggleFollow(username: string, userId: string) {
  const target = await prisma.user.findUnique({ where: { username }, select: { id: true } });
  if (!target) throw new HttpError(404, "No one goes by that name here.");
  if (target.id === userId) throw new HttpError(400, "You can't follow yourself.");
  const key = { followerId_followingId: { followerId: userId, followingId: target.id } };
  const existing = await prisma.follows.findUnique({ where: key });
  if (existing) await prisma.follows.delete({ where: key });
  else
    await prisma.$transaction([
      prisma.follows.create({ data: { followerId: userId, followingId: target.id } }),
      prisma.notification.create({ data: { type: "FOLLOW", userId: target.id, creatorId: userId } }),
    ]);
  return { following: !existing };
}

export async function suggestedPeople(viewerId: string | null): Promise<PersonRow[]> {
  const rows = await prisma.user.findMany({
    where: viewerId ? { id: { not: viewerId }, followers: { none: { followerId: viewerId } } } : {},
    select: { ...userLite, _count: { select: { followers: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return rows.map((r) => ({ ...r, followers: r._count.followers, isFollowing: false }));
}

export async function searchPeople(q: string, viewerId: string | null): Promise<PersonRow[]> {
  if (!q) return suggestedPeople(viewerId);
  const rows = await prisma.user.findMany({
    where: { OR: [{ username: { contains: q, mode: "insensitive" } }, { name: { contains: q, mode: "insensitive" } }] },
    select: {
      ...userLite, _count: { select: { followers: true } },
      followers: viewerId ? { where: { followerId: viewerId }, select: { followerId: true } } : false,
    },
    take: 20,
  });
  return rows.map((r) => ({
    id: r.id, name: r.name, username: r.username, image: r.image,
    followers: r._count.followers, isFollowing: Array.isArray(r.followers) && r.followers.length > 0,
  }));
}
