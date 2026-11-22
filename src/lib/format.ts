/** Age as a short, unambiguous duration: now, 12m, 3h, 2d, then a date. */
export function tapeAge(iso: string, now = Date.now()): string {
  const secs = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  if (secs < 60) return "now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  const h = Math.floor(secs / 3600);
  if (h < 48) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  return new Date(iso).toLocaleDateString("en", { month: "short", day: "numeric" });
}

export function ageLabel(iso: string): string {
  return new Date(iso).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" });
}

export function trackNumber(n: number): string {
  return String(n).padStart(2, "0");
}

export const TAG_RE = /#([\p{L}\p{N}_]{2,30})/gu;

export function extractTags(text: string): string[] {
  return [...text.matchAll(TAG_RE)].map((m) => m[1].toLowerCase());
}

export function initials(name: string | null, username: string): string {
  const src = (name || username).trim();
  return src.slice(0, 2).toUpperCase();
}

export function displayName(u: { name: string | null; username: string }): string {
  return u.name?.trim() || u.username;
}
