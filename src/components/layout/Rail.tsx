"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenLine, ShieldCheck } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useComposer } from "@/stores/composer";
import { useSession } from "@/stores/session";
import { Button } from "@/components/ui/Button";
import { AuthButtons } from "./AuthButtons";
import { NavIcon } from "./NavIcon";
import { UnreadMark } from "./UnreadMark";
import { Wordmark } from "./Wordmark";

export function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

/** Desktop spine: ultramarine rail with the primary navigation. */
export function Rail() {
  const path = usePathname();
  const me = useSession((s) => s.me);
  const setOpen = useComposer((s) => s.setOpen);
  return (
    <aside className="on-spine sticky top-0 hidden h-dvh w-[16.25rem] shrink-0 flex-col bg-spine px-6 py-8 text-on-spine lg:flex">
      <Link href="/" aria-label="be2gether home"><Wordmark stacked /></Link>
      <nav aria-label="Primary" className="mt-12 flex-1">
        <ul className="space-y-1">
          {[...NAV_ITEMS, ...(me?.isAdmin ? [{ href: "/admin", label: "Admin", icon: "settings" as const }] : [])].map((item) => {
            const active = isActive(path, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("flex min-h-12 items-center gap-3 px-3 text-lg font-semibold transition-colors", active ? "bg-paper text-ink" : "hover:bg-on-spine/15")}
                >
                  {item.href === "/admin" ? <ShieldCheck aria-hidden className="size-5" strokeWidth={2.25} /> : <NavIcon id={item.icon} />}
                  {item.label}
                  {item.href === "/notifications" && <UnreadMark />}
                </Link>
              </li>
            );
          })}
          {me && (
            <li>
              <Link href={`/profile/${me.username}`} aria-current={path.startsWith("/profile/") ? "page" : undefined} className={cn("flex min-h-12 items-center gap-3 px-3 text-lg font-semibold", path.startsWith("/profile/") ? "bg-paper text-ink" : "hover:bg-on-spine/15")}>
                <span aria-hidden className="grid size-5 place-items-center font-display text-lg font-black">@</span>Profile
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="space-y-4">
        {me && <Button variant="signal" className="w-full" onClick={() => setOpen(true)}><PenLine aria-hidden className="size-5" />Record a track</Button>}
        <AuthButtons onSpine />
      </div>
    </aside>
  );
}
