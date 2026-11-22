import { prisma } from "@/lib/prisma";
import type { ReportRow } from "@/types";
import { HttpError } from "./http";
import { userLite } from "./mappers";

export async function listReports(): Promise<ReportRow[]> {
  const rows = await prisma.report.findMany({
    where: { resolved: false },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { reporter: { select: userLite }, post: { select: { id: true, content: true, author: { select: userLite } } } },
  });
  return rows.map((r) => ({ id: r.id, reason: r.reason, createdAt: r.createdAt.toISOString(), reporter: r.reporter, post: r.post }));
}

export async function resolveReport(id: string, action: "dismiss" | "remove") {
  const r = await prisma.report.findUnique({ where: { id }, select: { postId: true } });
  if (!r) throw new HttpError(404, "Report not found.");
  if (action === "remove") await prisma.post.delete({ where: { id: r.postId } });
  else await prisma.report.update({ where: { id }, data: { resolved: true } });
}

export async function demoStats() {
  const [users, posts] = await Promise.all([
    prisma.user.count({ where: { isDemo: true } }),
    prisma.post.count({ where: { isDemo: true } }),
  ]);
  return { users, posts };
}

/** Removes only rows flagged isDemo. Cascades take their posts, likes and comments. */
export async function removeDemoContent() {
  const posts = await prisma.post.deleteMany({ where: { isDemo: true } });
  const users = await prisma.user.deleteMany({ where: { isDemo: true } });
  return { users: users.count, posts: posts.count };
}
