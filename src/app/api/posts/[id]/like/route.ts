import { json, route } from "@/server/http";
import { toggleLike } from "@/server/posts";
import { requireUser } from "@/server/session";

export const POST = route(async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const user = await requireUser();
  return json(await toggleLike((await params).id, user.id));
});
