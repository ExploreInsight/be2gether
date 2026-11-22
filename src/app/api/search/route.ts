import { cursorOf, json, route } from "@/server/http";
import { searchTracks } from "@/server/posts";
import { getSessionUser } from "@/server/session";
import { searchPeople } from "@/server/users";

export const GET = route(async (req: Request) => {
  const sp = new URL(req.url).searchParams;
  const q = (sp.get("q") ?? "").trim().slice(0, 80);
  const user = await getSessionUser();
  if (sp.get("type") === "people") return json(await searchPeople(q, user?.id ?? null));
  return json(
    await searchTracks(user?.id ?? null, q, { hasImage: sp.get("hasImage") === "1", sort: sp.get("sort") === "liked" ? "liked" : "new" }, cursorOf(req)),
  );
});
