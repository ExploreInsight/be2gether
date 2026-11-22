import { prisma } from "@/lib/prisma";
import { cursorOf, HttpError, json, route } from "@/server/http";
import { getUserTracks } from "@/server/posts";
import { getSessionUser } from "@/server/session";

export const GET = route(async (req: Request, { params }: { params: Promise<{ username: string }> }) => {
  const viewer = await getSessionUser();
  const target = await prisma.user.findUnique({ where: { username: (await params).username }, select: { id: true } });
  if (!target) throw new HttpError(404, "No one goes by that name here.");
  const tab = new URL(req.url).searchParams.get("tab") === "likes" ? "likes" : "posts";
  return json(await getUserTracks(target.id, viewer?.id ?? null, tab, cursorOf(req)));
});
