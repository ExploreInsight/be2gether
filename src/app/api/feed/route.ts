import { cursorOf, json, route } from "@/server/http";
import { getFeed } from "@/server/posts";
import { seedIfEmpty } from "@/server/seed";
import { getSessionUser } from "@/server/session";
import type { Side } from "@/types";

export const GET = route(async (req: Request) => {
  await seedIfEmpty();
  const user = await getSessionUser();
  const side = (new URL(req.url).searchParams.get("side") === "friends" ? "friends" : "everyone") as Side;
  return json(await getFeed(user?.id ?? null, side, cursorOf(req)));
});
