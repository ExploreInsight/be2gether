import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  onPrimary = false,
}: {
  className?: string;
  onPrimary?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "font-serif text-2xl font-semibold tracking-[-0.035em]",
        onPrimary ? "text-primary-foreground" : "text-foreground",
        className
      )}
    >
      be<span className="text-brand-highlight">2</span>gether
    </Link>
  );
}
