import { json, route } from "@/server/http";
import { deleteComment } from "@/server/posts";
import { requireUser } from "@/server/session";

export const DELETE = route(async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const user = await requireUser();
  await deleteComment((await params).id, user.id);
  return json({ ok: true });
});
