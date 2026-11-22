"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenLine, ShieldCheck, User } from "lucide-react";
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

const link = "flex min-h-12 items-center gap-3 rounded-full px-4 text-lg font-bold transition-colors";

/** Desktop sidebar: light, with pill navigation and a New post button. */
export function Rail() {
  const path = usePathname();
  const me = useSession((s) => s.me);
  const setOpen = useComposer((s) => s.setOpen);
  const items = [...NAV_ITEMS] as { href: string; label: string; icon: (typeof NAV_ITEMS)[number]["icon"] }[];
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-rule bg-card px-4 py-8 lg:flex">
      <Link href="/" aria-label="be2gether home" className="px-3"><Wordmark /></Link>
      <nav aria-label="Primary" className="mt-10 flex-1">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = isActive(path, item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(link, active ? "bg-wash text-accent" : "hover:bg-hover")}>
                  <NavIcon id={item.icon} />{item.label}
                  {item.href === "/notifications" && <UnreadMark />}
                </Link>
              </li>
            );
          })}
          {me && (
            <li>
              <Link href={`/profile/${me.username}`} aria-current={path.startsWith("/profile/") ? "page" : undefined} className={cn(link, path.startsWith("/profile/") ? "bg-wash text-accent" : "hover:bg-hover")}>
                <User aria-hidden className="size-5" strokeWidth={2.25} />Profile
              </Link>
            </li>
          )}
          {me?.isAdmin && (
            <li>
              <Link href="/admin" aria-current={path.startsWith("/admin") ? "page" : undefined} className={cn(link, path.startsWith("/admin") ? "bg-wash text-accent" : "hover:bg-hover")}>
                <ShieldCheck aria-hidden className="size-5" strokeWidth={2.25} />Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="space-y-4 px-1">
        {me && <Button className="w-full" onClick={() => setOpen(true)}><PenLine aria-hidden className="size-5" />New post</Button>}
        <AuthButtons />
      </div>
    </aside>
  );
}
