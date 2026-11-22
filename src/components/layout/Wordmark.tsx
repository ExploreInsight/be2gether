import { cn } from "@/lib/utils";

/** Two overlapping speech bubbles plus a lowercase rounded wordmark. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 28" className="h-7 w-auto shrink-0" aria-hidden>
        <path d="M4 3h14a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6l-5 4v-4H4a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" fill="var(--brand)" />
        <path d="M14 11h14a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-1v3l-4-3h-9a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4Z" fill="var(--pop)" opacity=".95" />
      </svg>
      <span className="font-display text-2xl font-extrabold leading-none tracking-tight">be2gether</span>
    </span>
  );
}
