import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-4 rounded-full bg-[linear-gradient(90deg,var(--hover),var(--rule)_50%,var(--hover))] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]", className)}
    />
  );
}

export function TrackSkeleton() {
  return (
    <div className="mb-4 grid grid-cols-[2.75rem_1fr] gap-3 rounded-3xl border border-rule bg-card p-5 shadow-card" role="status" aria-label="Loading posts">
      <Skeleton className="size-11" />
      <div className="space-y-3">
        <Skeleton className="w-1/3" />
        <Skeleton className="w-full" />
        <Skeleton className="w-2/3" />
      </div>
    </div>
  );
}
