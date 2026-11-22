import { cn } from "@/lib/utils";

/** Cassette mark (two reels in a shell) plus the stacked condensed wordmark. */
export function Wordmark({ className, stacked = false }: { className?: string; stacked?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 22" className="h-6 w-auto shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <rect x="1.5" y="1.5" width="29" height="19" rx="3" />
        <circle cx="10.5" cy="10" r="3.4" />
        <circle cx="21.5" cy="10" r="3.4" />
        <path d="M8 17h16" />
      </svg>
      <span className={cn("font-display font-black uppercase leading-[0.85] tracking-[0.01em]", stacked ? "text-5xl" : "text-3xl")}>
        {stacked ? (<>be2<br />gether</>) : "be2gether"}
      </span>
    </span>
  );
}
