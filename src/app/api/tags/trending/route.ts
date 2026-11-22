import { json, route } from "@/server/http";
import { trendingTags } from "@/server/posts";

export const GET = route(async () => json(await trendingTags()));
