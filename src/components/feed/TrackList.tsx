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
              <h2 className="pb-1 pt-6 font-display text-2xl font-black uppercase tracking-[0.04em]">
                {g.label} <span className="font-sans text-sm font-semibold normal-case tracking-normal text-muted tnum">{g.items.length} {g.items.length === 1 ? "track" : "tracks"}</span>
              </h2>
              {g.items.map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
            </section>
          ))
        : items.map((t) => <TrackRow key={t.id} track={t} />)}
      {hasMore && (
        <div className="flex justify-center py-6">
          <Button variant="outline" loading={loadingMore} onClick={onMore}>Play more tracks</Button>
        </div>
      )}
      {!hasMore && <div className="py-8 text-center"><div aria-hidden className="mx-auto mb-3 h-8 w-40 bg-[repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_6px,var(--ink)_6px_7px,transparent_7px_11px)]" /><p className="font-display text-2xl font-black uppercase text-muted">End of tape</p></div>}
    </div>
  );
}
