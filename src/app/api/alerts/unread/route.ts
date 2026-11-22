import { json, route } from "@/server/http";
import { unreadCount } from "@/server/alerts";
import { getSessionUser } from "@/server/session";

export const GET = route(async () => {
  const u = await getSessionUser();
  return json({ unread: u ? await unreadCount(u.id) : 0 });
});
