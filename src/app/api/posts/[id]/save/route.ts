import { json, route } from "@/server/http";
import { toggleSave } from "@/server/posts";
import { requireUser } from "@/server/session";

export const POST = route(async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const user = await requireUser();
  return json(await toggleSave((await params).id, user.id));
});
