import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-serif text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground",
        className
      )}
    >
      be<span className="text-primary">2</span>gether
    </Link>
  );
}
