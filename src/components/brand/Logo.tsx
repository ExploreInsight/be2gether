import Link from "next/link";
import { cn } from "@/lib/utils";

const TONES = {
  solid: { tile: "var(--brand)", glyph: "var(--brand-foreground)" },
  inverse: { tile: "currentColor", glyph: "var(--brand)" },
} as const;

export function LogoMark({
  className,
  tone = "solid",
}: {
  className?: string;
  tone?: keyof typeof TONES;
}) {
  const { tile, glyph } = TONES[tone];

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
      style={{ "--tile": tile, "--glyph": glyph } as React.CSSProperties}
    >
      <rect width="32" height="32" rx="9.5" fill="var(--tile)" />
      <path
        d="M11.8 20.2a5.5 5.5 0 1 1 9.4-4.4L11.5 25.5h9.7"
        fill="none"
        stroke="var(--glyph)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "solid",
  href = "/",
}: {
  className?: string;
  tone?: keyof typeof TONES;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5", className)}
      aria-label="be2gether home"
    >
      <LogoMark tone={tone} />
      <span
        className={cn(
          "font-serif text-xl font-semibold tracking-[-0.035em]",
          tone === "inverse" ? "text-brand-foreground" : "text-foreground"
        )}
      >
        be
        <span className={tone === "inverse" ? "text-brand-highlight" : "text-primary"}>
          2
        </span>
        gether
      </span>
    </Link>
  );
}
