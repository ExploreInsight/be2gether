import { json, readJson, route } from "@/server/http";
import { reportTrack } from "@/server/posts";
import { requireUser } from "@/server/session";

export const POST = route(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const user = await requireUser();
  const body = await readJson<{ reason?: string }>(req);
  await reportTrack((await params).id, user.id, body.reason ?? "");
  return json({ ok: true }, 201);
});
