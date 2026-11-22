"use client";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState } from "@/components/ui/State";
import { TrackSkeleton } from "@/components/ui/Skeleton";
import type { Status } from "@/hooks/useResource";
import { groupByDay } from "@/lib/days";
import type { Track } from "@/types";
import { TrackRow } from "./TrackRow";

type Props = {
  items: Track[];
  status: Status;
  error: string | null;
  hasMore: boolean;
  loadingMore: boolean;
  onMore: () => void;
  onRetry: () => void;
  empty: { title: string; text: string; action?: ReactNode };
  /** Group by day with a heading and number rows within each day. */
  byDay?: boolean;
};

export function TrackList({ items, status, error, hasMore, loadingMore, onMore, onRetry, empty, byDay }: Props) {
  if (status === "loading") return <div>{[0, 1, 2, 3].map((i) => <TrackSkeleton key={i} />)}</div>;
  if (status === "error") return <ErrorState message={error} onRetry={onRetry} />;
  if (items.length === 0) return <EmptyState title={empty.title} action={empty.action}>{empty.text}</EmptyState>;
  return (
    <div>
      {byDay
        ? groupByDay(items).map((g) => (
            <section key={g.label} aria-label={g.label}>
              <h2 className="pb-3 pt-4 font-display text-xl font-extrabold">
                {g.label} <span className="font-sans text-sm font-semibold normal-case tracking-normal text-muted tnum">{g.items.length} {g.items.length === 1 ? "post" : "posts"}</span>
              </h2>
              {g.items.map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
            </section>
          ))
        : items.map((t) => <TrackRow key={t.id} track={t} />)}
      {hasMore && (
        <div className="flex justify-center py-6">
          <Button variant="outline" loading={loadingMore} onClick={onMore}>Show more</Button>
        </div>
      )}
      {!hasMore && <p className="py-8 text-center font-semibold text-muted">You are all caught up.</p>}
    </div>
  );
}
