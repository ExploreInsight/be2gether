/**
 * Synthetic API for visual checks when no database or Clerk is available.
 *   npx tsx scripts/mock-api.ts            (port 4010)
 * Run the app with NEXT_PUBLIC_PREVIEW=1 NEXT_PUBLIC_API_BASE=http://localhost:4010.
 * Everything here is made up. Nothing reads or writes a real database.
 */
import http from "node:http";
import { DEMO_COMMENTS, DEMO_POSTS, DEMO_USERS } from "../src/server/seed-data";

const users = DEMO_USERS.map((u, i) => ({ id: `u${i}`, name: u.name, username: u.username, image: null as string | null, bio: u.bio, location: u.location }));
const byName = Object.fromEntries(users.map((u) => [u.username, u]));
const lite = (u: (typeof users)[number]) => ({ id: u.id, name: u.name, username: u.username, image: u.image });
const now = Date.now();
const PHOTO = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><rect width='640' height='400' fill='#2a3bd6'/><circle cx='200' cy='200' r='90' fill='none' stroke='#f2f4f1' stroke-width='14'/><circle cx='440' cy='200' r='90' fill='none' stroke='#f2f4f1' stroke-width='14'/><text x='320' y='360' text-anchor='middle' font-size='28' fill='#f2f4f1' font-family='sans-serif'>synthetic demo image</text></svg>`);

const tracks = [
  ...DEMO_POSTS.map(([who, content, mins], i) => ({
    id: `p${i}`, content, image: i === 5 ? PHOTO : null, createdAt: new Date(now - mins * 60_000).toISOString(),
    author: lite(byName[who]), likeCount: (i * 3) % 7, commentCount: DEMO_COMMENTS.filter((c) => c[0] === i).length,
    liked: i === 1, saved: i === 2, isDemo: true,
  })),
  { id: "px", content: "Supercalifragilisticexpialidocious_and_a_very_long_unbroken_string_to_test_wrapping_on_a_small_screen https://example.com/a/really/long/path/that/never/ends #wrapping", image: null, createdAt: new Date(now - 4_000_000).toISOString(), author: lite(users[1]), likeCount: 0, commentCount: 0, liked: false, saved: false, isDemo: true },
];
const people = users.map((u) => ({ ...lite(u), followers: 2, isFollowing: false }));
const send = (res: http.ServerResponse, data: unknown, status = 200) => {
  res.writeHead(status, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS" });
  res.end(JSON.stringify(data));
};
const page = (items: unknown[], cursor: string | null) => {
  const start = cursor ? Number(cursor) : 0;
  const size = 8;
  return { items: items.slice(start, start + size), nextCursor: start + size < items.length ? String(start + size) : null };
};
const mode = process.env.MOCK_STATE ?? "full"; // full | empty | error | slow

http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://x");
  const p = url.pathname;
  if (req.method === "OPTIONS") return send(res, {});
  if (mode === "slow") await new Promise((r) => setTimeout(r, 6000));
  if (mode === "error" && p !== "/api/me" && p !== "/api/alerts/unread") return send(res, { error: "Synthetic outage for the error state." }, 500);
  const list = mode === "empty" ? [] : tracks;
  if (p === "/api/me") return send(res, { id: "me", name: "You (preview)", username: "you", image: null, isAdmin: true });
  if (p === "/api/alerts/unread") return send(res, { unread: 2 });
  if (p === "/api/feed" || p === "/api/saved") return send(res, page(p === "/api/saved" ? list.filter((t) => t.saved) : list, url.searchParams.get("cursor")));
  if (p === "/api/search") {
    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    if (url.searchParams.get("type") === "people") return send(res, people.filter((u) => !q || u.username.includes(q) || (u.name ?? "").toLowerCase().includes(q)));
    return send(res, page(list.filter((t) => (t.content ?? "").toLowerCase().includes(q)), url.searchParams.get("cursor")));
  }
  if (p === "/api/tags/trending") return send(res, [{ tag: "nightwalk", count: 2 }, { tag: "sunday", count: 2 }, { tag: "mixtape", count: 2 }, { tag: "dinner", count: 2 }]);
  if (p === "/api/users/suggested") return send(res, people.slice(0, 4));
  if (p === "/api/alerts") return send(res, mode === "empty" ? [] : [
    { id: "a1", type: "LIKE", read: false, createdAt: new Date(now - 300_000).toISOString(), creator: lite(users[0]), postId: "p1", postSnippet: "Finally fixed the bike chain.", commentSnippet: null },
    { id: "a2", type: "COMMENT", read: false, createdAt: new Date(now - 3_600_000).toISOString(), creator: lite(users[4]), postId: "p0", postSnippet: null, commentSnippet: "Window seat is undefeated." },
    { id: "a3", type: "FOLLOW", read: true, createdAt: new Date(now - 90_000_000).toISOString(), creator: lite(users[2]), postId: null, postSnippet: null, commentSnippet: null },
  ]);
  if (p === "/api/admin/reports") return send(res, mode === "empty" ? [] : [{ id: "r1", reason: "Synthetic report reason for layout.", createdAt: new Date(now - 600_000).toISOString(), reporter: lite(users[3]), post: { id: "p3", content: tracks[3].content, author: lite(users[3]) } }]);
  if (p === "/api/admin/demo") return send(res, { users: 6, posts: 13 });
  let m = p.match(/^\/api\/posts\/([^/]+)$/);
  if (m && req.method === "GET") {
    const t = tracks.find((x) => x.id === m![1]);
    if (!t) return send(res, { error: "That track is gone." }, 404);
    const comments = DEMO_COMMENTS.map((c, i) => ({ c, i })).filter(({ c }) => `p${c[0]}` === t.id).map(({ c, i }) => ({ id: `c${i}`, content: c[2], createdAt: new Date(now - 60_000 * (i + 1)).toISOString(), author: lite(byName[c[1]]), canDelete: false }));
    return send(res, { ...t, comments, canDelete: false });
  }
  m = p.match(/^\/api\/users\/([^/]+)(\/posts)?$/);
  if (m) {
    const u = byName[m[1]] ?? (m[1] === "you" ? { ...users[0], id: "me", name: "You (preview)", username: "you" } : null);
    if (!u) return send(res, { error: "No one goes by that name here." }, 404);
    if (m[2]) return send(res, page(list.filter((t) => t.author.username === u.username), url.searchParams.get("cursor")));
    return send(res, { ...lite(u), bio: u.bio, location: u.location, website: "https://example.com", createdAt: new Date(now - 90 * 86_400_000).toISOString(), followers: 2, following: 3, posts: 2, isFollowing: false, isMe: (u.username as string) === "you", isDemo: true });
  }
  if (req.method === "POST" && /\/like$/.test(p)) return send(res, { liked: true, likeCount: 4 });
  if (req.method === "POST" && /\/save$/.test(p)) return send(res, { saved: true });
  send(res, { ok: true });
}).listen(4010, () => console.log(`mock api (${mode}) on :4010`));
