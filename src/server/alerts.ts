import { prisma } from "@/lib/prisma";
import type { AlertItem } from "@/types";
import { userLite } from "./mappers";

export async function listAlerts(userId: string): Promise<AlertItem[]> {
  const rows = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      creator: { select: userLite },
      post: { select: { content: true } },
      comment: { select: { content: true } },
    },
  });
  return rows.map((n) => ({
    id: n.id, type: n.type, read: n.read, createdAt: n.createdAt.toISOString(),
    creator: n.creator, postId: n.postId,
    postSnippet: n.post?.content?.slice(0, 90) ?? null,
    commentSnippet: n.comment?.content.slice(0, 90) ?? null,
  }));
}

export const unreadCount = (userId: string) => prisma.notification.count({ where: { userId, read: false } });

export const markAllRead = (userId: string) =>
  prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
