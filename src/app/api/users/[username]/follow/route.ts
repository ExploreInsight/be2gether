import { json, route } from "@/server/http";
import { requireUser } from "@/server/session";
import { toggleFollow } from "@/server/users";

export const POST = route(async (_req: Request, { params }: { params: Promise<{ username: string }> }) => {
  const u = await requireUser();
  return json(await toggleFollow((await params).username, u.id));
});
