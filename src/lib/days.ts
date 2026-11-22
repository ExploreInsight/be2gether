import type { Track } from "@/types";

export type DayGroup = { label: string; items: Track[] };

function dayLabel(d: Date, now: Date): string {
  const start = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((start(now) - start(d)) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric" });
}

/** Groups a newest-first list by calendar day, preserving order. */
export function groupByDay(items: Track[], now = new Date()): DayGroup[] {
  const groups: DayGroup[] = [];
  for (const t of items) {
    const label = dayLabel(new Date(t.createdAt), now);
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(t);
    else groups.push({ label, items: [t] });
  }
  return groups;
}
