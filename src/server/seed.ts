import { prisma } from "@/lib/prisma";
import { DEMO_COMMENTS, DEMO_LIKES, DEMO_POSTS, DEMO_USERS } from "./seed-data";

let checked = false;

/** Seeds demo content only when the database has no users and no posts. */
export async function seedIfEmpty(): Promise<boolean> {
  if (checked || process.env.AUTO_SEED === "false") return false;
  checked = true;
  const [users, posts] = await Promise.all([prisma.user.count(), prisma.post.count()]);
  if (users > 0 || posts > 0) return false;
  await seedDemo();
  return true;
}

export async function seedDemo() {
  const byName = new Map<string, string>();
  for (const u of DEMO_USERS) {
    const row = await prisma.user.upsert({
      where: { username: u.username },
      update: {},
      create: { ...u, email: `${u.username}@demo.invalid`, clerkId: `demo_${u.username}`, isDemo: true },
    });
    byName.set(u.username, row.id);
  }
  const now = Date.now();
  const postIds: string[] = [];
  for (const [who, content, mins] of DEMO_POSTS) {
    const p = await prisma.post.create({
      data: { content, authorId: byName.get(who)!, isDemo: true, createdAt: new Date(now - mins * 60_000) },
    });
    postIds.push(p.id);
  }
  for (const [i, who, content] of DEMO_COMMENTS) {
    await prisma.comment.create({
      data: { content, postId: postIds[i], authorId: byName.get(who)!, createdAt: new Date(now - (DEMO_POSTS[i][2] - 2) * 60_000) },
    });
  }
  for (const [i, who] of DEMO_LIKES) {
    await prisma.like.create({ data: { postId: postIds[i], userId: byName.get(who)! } });
  }
}
