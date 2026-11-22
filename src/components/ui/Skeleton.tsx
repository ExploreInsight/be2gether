import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-4 bg-[linear-gradient(90deg,var(--hover),var(--rule)_50%,var(--hover))] bg-[length:200%_100%] opacity-20 animate-[shimmer_1.6s_linear_infinite]", className)}
    />
  );
}

export function TrackSkeleton() {
  return (
    <div className="grid grid-cols-[2.75rem_1fr] gap-3 border-b border-ink/30 py-5" role="status" aria-label="Loading tracks">
      <Skeleton className="h-8 w-8" />
      <div className="space-y-3">
        <Skeleton className="w-1/3" />
        <Skeleton className="w-full" />
        <Skeleton className="w-2/3" />
      </div>
    </div>
  );
}
