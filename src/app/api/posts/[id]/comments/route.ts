import { json, readJson, route } from "@/server/http";
import { addComment } from "@/server/posts";
import { requireUser } from "@/server/session";

export const POST = route(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const user = await requireUser();
  const body = await readJson<{ content?: string }>(req);
  await addComment((await params).id, user.id, body.content ?? "");
  return json({ ok: true }, 201);
});
