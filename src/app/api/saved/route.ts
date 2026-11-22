import { cursorOf, json, route } from "@/server/http";
import { getSaved } from "@/server/posts";
import { requireUser } from "@/server/session";

export const GET = route(async (req: Request) => {
  const user = await requireUser();
  return json(await getSaved(user.id, cursorOf(req)));
});
