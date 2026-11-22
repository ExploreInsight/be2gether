import { json, readJson, route } from "@/server/http";
import { getSessionUser, isAdminEmail, requireUser } from "@/server/session";
import { updateProfile } from "@/server/users";

export const GET = route(async () => {
  const u = await getSessionUser();
  if (!u) return json(null);
  const { email, ...rest } = u;
  return json({ ...rest, isAdmin: isAdminEmail(email) });
});

export const PATCH = route(async (req: Request) => {
  const u = await requireUser();
  await updateProfile(u.id, await readJson(req));
  return json({ ok: true });
});
