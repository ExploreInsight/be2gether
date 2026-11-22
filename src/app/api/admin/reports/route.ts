import { json, route } from "@/server/http";
import { listReports } from "@/server/admin";
import { requireAdmin } from "@/server/session";

export const GET = route(async () => {
  await requireAdmin();
  return json(await listReports());
});
