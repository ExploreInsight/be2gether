import { json, readJson, route } from "@/server/http";
import { resolveReport } from "@/server/admin";
import { requireAdmin } from "@/server/session";

export const POST = route(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  await requireAdmin();
  const { action } = await readJson<{ action: "dismiss" | "remove" }>(req);
  await resolveReport((await params).id, action === "remove" ? "remove" : "dismiss");
  return json({ ok: true });
});
