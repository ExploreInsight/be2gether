"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComposer } from "@/stores/composer";
import { useSession } from "@/stores/session";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { NavIcon } from "./NavIcon";
import { isActive } from "./Rail";

const tab = "relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-bold";

/** Thumb-reach navigation for phones, with a round New post button in the middle. */
export function TabBar() {
  const path = usePathname();
  const me = useSession((s) => s.me);
  const unread = useSession((s) => s.unread);
  const setOpen = useComposer((s) => s.setOpen);
  const guard = useRequireAuth();
  const profileHref = me ? `/profile/${me.username}` : "/settings";
  const item = (href: string, label: string, icon: React.ReactNode) => {
    const active = isActive(path, href);
    return (
      <Link href={href} aria-current={active ? "page" : undefined} className={cn(tab, active ? "text-accent" : "text-muted")}>
        {icon}{label}
      </Link>
    );
  };
  const alertsActive = isActive(path, "/notifications");
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 flex items-end rounded-t-3xl border-t border-rule bg-card pb-[var(--safe-bottom)] shadow-card lg:hidden">
      {item("/", "Home", <NavIcon id="feed" />)}
      {item("/search", "Search", <NavIcon id="search" />)}
      <div className="flex flex-1 justify-center">
        <button type="button" onClick={() => guard(() => setOpen(true))} aria-label="New post" className="-mt-6 mb-2 inline-flex size-14 items-center justify-center rounded-full bg-brand text-on-brand shadow-card active:scale-95">
          <Plus aria-hidden className="size-7" strokeWidth={2.75} />
        </button>
      </div>
      <Link href="/notifications" aria-current={alertsActive ? "page" : undefined} className={cn(tab, alertsActive ? "text-accent" : "text-muted")}>
        <NavIcon id="alerts" />Alerts
        {unread > 0 && <span className="absolute right-[28%] top-2 size-2.5 rounded-full bg-brand ring-2 ring-card" aria-hidden />}
        {unread > 0 && <span className="sr-only">{unread} unread</span>}
      </Link>
      {item(profileHref, me ? "Me" : "Settings", me ? <User aria-hidden className="size-5" strokeWidth={2.25} /> : <NavIcon id="settings" />)}
    </nav>
  );
}
