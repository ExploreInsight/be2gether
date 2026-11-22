import { json, route } from "@/server/http";
import { listAlerts, markAllRead } from "@/server/alerts";
import { requireUser } from "@/server/session";

export const GET = route(async () => {
  const u = await requireUser();
  return json(await listAlerts(u.id));
});

export const POST = route(async () => {
  const u = await requireUser();
  await markAllRead(u.id);
  return json({ ok: true });
});
