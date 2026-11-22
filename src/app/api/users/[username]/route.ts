import { json, route } from "@/server/http";
import { getSessionUser } from "@/server/session";
import { getProfile } from "@/server/users";

export const GET = route(async (_req: Request, { params }: { params: Promise<{ username: string }> }) => {
  const u = await getSessionUser();
  return json(await getProfile((await params).username, u?.id ?? null));
});
