"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenLine, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComposer } from "@/stores/composer";
import { useSession } from "@/stores/session";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { NavIcon } from "./NavIcon";
import { UnreadMark } from "./UnreadMark";
import { isActive } from "./Rail";

const tab = "relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold";

/** Thumb-reach navigation for phones, with Record in the middle. */
export function TabBar() {
  const path = usePathname();
  const me = useSession((s) => s.me);
  const setOpen = useComposer((s) => s.setOpen);
  const unread = useSession((s) => s.unread);
  const guard = useRequireAuth();
  const profileHref = me ? `/profile/${me.username}` : "/settings";
  const item = (href: string, label: string, icon: React.ReactNode) => {
    const active = isActive(path, href);
    return (
      <Link href={href} aria-current={active ? "page" : undefined} className={cn(tab, active ? "bg-ink text-paper" : "text-ink")}>
        {icon}{label}
      </Link>
    );
  };
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 flex border-t-2 border-ink bg-paper pb-[var(--safe-bottom)] lg:hidden">
      {item("/", "Feed", <NavIcon id="feed" />)}
      {item("/search", "Search", <NavIcon id="search" />)}
      <button type="button" onClick={() => guard(() => setOpen(true))} className={cn(tab, "bg-signal text-on-signal")} aria-label="Record a track">
        <PenLine aria-hidden className="size-6" strokeWidth={2.5} />Record
      </button>
      <Link href="/notifications" aria-current={isActive(path, "/notifications") ? "page" : undefined} className={cn(tab, isActive(path, "/notifications") ? "bg-ink text-paper" : "text-ink")}>
        <NavIcon id="alerts" />Alerts
        {unread > 0 && <span className="absolute right-[28%] top-2 size-2.5 bg-signal" aria-hidden />}
        {unread > 0 && <span className="sr-only">{unread} unread</span>}
      </Link>
      {item(profileHref, me ? "Me" : "Settings", me ? <User aria-hidden className="size-5" strokeWidth={2.25} /> : <NavIcon id="settings" />)}
    </nav>
  );
}
