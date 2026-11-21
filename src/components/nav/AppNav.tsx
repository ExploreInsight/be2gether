"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, HomeIcon, UserIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppNavProps = {
  signedIn: boolean;
  username?: string | null;
  layout: "desktop" | "sheet";
  tone?: "default" | "on-brand";
  unreadCount?: number;
  onNavigate?: () => void;
};

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  badge?: number;
};

export function AppNav({
  signedIn,
  username,
  layout,
  tone = "default",
  unreadCount = 0,
  onNavigate,
}: AppNavProps) {
  const pathname = usePathname();
  const profileHref = username ? `/profile/${username}` : null;

  const items: Item[] = [
    { href: "/", label: "Home", icon: HomeIcon, active: pathname === "/" },
  ];

  if (signedIn) {
    items.push({
      href: "/notifications",
      label: "Notifications",
      icon: BellIcon,
      active: pathname.startsWith("/notifications"),
      badge: unreadCount,
    });

    if (profileHref) {
      items.push({
        href: profileHref,
        label: "Profile",
        icon: UserIcon,
        active: pathname === profileHref,
      });
    }
  }

  return (
    <div className={cn(layout === "sheet" ? "flex flex-col gap-1" : "flex items-center gap-1")}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            onClick={onNavigate}
            className={cn(
              layout === "sheet" ? "justify-start gap-3" : "gap-2",
              tone === "on-brand"
                ? item.active
                  ? "bg-brand-foreground/15 text-brand-foreground hover:bg-brand-foreground/20 hover:text-brand-foreground"
                  : "text-brand-foreground/80 hover:bg-brand-foreground/10 hover:text-brand-foreground"
                : item.active && "bg-accent text-accent-foreground"
            )}
          >
            <Link href={item.href} aria-current={item.active ? "page" : undefined}>
              <span className="relative inline-flex">
                <Icon className="size-4" />
                {!!item.badge && (
                  <span
                    className={cn(
                      "absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-semibold tabular-nums",
                      tone === "on-brand"
                        ? "bg-brand-foreground text-brand"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </span>
              <span className={layout === "desktop" ? "hidden lg:inline" : undefined}>{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
