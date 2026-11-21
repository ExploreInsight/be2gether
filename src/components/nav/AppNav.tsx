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
  tone?: "default" | "on-primary";
  onNavigate?: () => void;
};

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
};

export function AppNav({ signedIn, username, layout, tone = "default", onNavigate }: AppNavProps) {
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
              tone === "on-primary"
                ? item.active
                  ? "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                : item.active && "bg-accent text-accent-foreground"
            )}
          >
            <Link href={item.href} aria-current={item.active ? "page" : undefined}>
              <Icon className="size-4" />
              <span className={layout === "desktop" ? "hidden lg:inline" : undefined}>{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
