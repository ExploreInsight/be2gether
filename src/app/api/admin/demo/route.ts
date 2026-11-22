import { json, route } from "@/server/http";
import { demoStats, removeDemoContent } from "@/server/admin";
import { requireAdmin } from "@/server/session";

export const GET = route(async () => {
  await requireAdmin();
  return json(await demoStats());
});

export const DELETE = route(async () => {
  await requireAdmin();
  return json(await removeDemoContent());
});
