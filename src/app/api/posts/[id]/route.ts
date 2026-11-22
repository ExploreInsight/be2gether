import { json, route } from "@/server/http";
import { deleteTrack, getTrack } from "@/server/posts";
import { getSessionUser, isAdminEmail, requireUser } from "@/server/session";

type Ctx = { params: Promise<{ id: string }> };

export const GET = route(async (_req: Request, { params }: Ctx) => {
  const user = await getSessionUser();
  return json(await getTrack((await params).id, user?.id ?? null));
});

export const DELETE = route(async (_req: Request, { params }: Ctx) => {
  const user = await requireUser();
  await deleteTrack((await params).id, user.id, isAdminEmail(user.email));
  return json({ ok: true });
});
