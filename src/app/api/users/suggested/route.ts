import { json, route } from "@/server/http";
import { getSessionUser } from "@/server/session";
import { suggestedPeople } from "@/server/users";

export const GET = route(async () => {
  const u = await getSessionUser();
  return json(await suggestedPeople(u?.id ?? null));
});
