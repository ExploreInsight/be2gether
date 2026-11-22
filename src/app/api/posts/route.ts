import { json, readJson, route } from "@/server/http";
import { createTrack } from "@/server/posts";
import { requireUser } from "@/server/session";

export const POST = route(async (req: Request) => {
  const user = await requireUser();
  const body = await readJson<{ content?: string; image?: string | null }>(req);
  return json(await createTrack(user.id, body.content ?? "", body.image ?? null), 201);
});
