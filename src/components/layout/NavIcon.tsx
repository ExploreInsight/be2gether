import { Bell, Bookmark, Home, Search, Settings } from "lucide-react";
import type { NavIcon as NavIconId } from "@/lib/constants";

const ICONS = { feed: Home, search: Search, saved: Bookmark, alerts: Bell, settings: Settings } as const;

export function NavIcon({ id, className }: { id: NavIconId; className?: string }) {
  const I = ICONS[id];
  return <I aria-hidden className={className ?? "size-5"} strokeWidth={2.25} />;
}
