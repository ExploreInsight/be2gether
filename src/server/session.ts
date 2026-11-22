import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { HttpError } from "./http";

const select = { id: true, name: true, username: true, image: true, email: true } as const;

/** The signed-in database user, created on first sight. Null when signed out. */
export async function getSessionUser() {
  const { userId } = await auth();
  if (!userId) return null;
  const existing = await prisma.user.findUnique({ where: { clerkId: userId }, select });
  if (existing) return existing;

  const u = await currentUser();
  if (!u) return null;
  const email = u.emailAddresses[0]?.emailAddress;
  if (!email) return null;
  const base = (u.username ?? email.split("@")[0]).toLowerCase().replace(/[^a-z0-9_]/g, "");
  let username = base || "friend";
  if (await prisma.user.findUnique({ where: { username } })) {
    username = `${username}${Math.floor(Math.random() * 9000 + 1000)}`;
  }
  return prisma.user.create({
    data: {
      clerkId: userId,
      email,
      username,
      name: [u.firstName, u.lastName].filter(Boolean).join(" ") || null,
      image: u.imageUrl,
    },
    select,
  });
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) throw new HttpError(401, "Sign in to do that.");
  return user;
}

export function isAdminEmail(email: string): boolean {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!isAdminEmail(user.email)) throw new HttpError(403, "Admins only.");
  return user;
}
