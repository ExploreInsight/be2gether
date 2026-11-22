"use client";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState } from "@/components/ui/State";
import { TrackSkeleton } from "@/components/ui/Skeleton";
import type { Status } from "@/hooks/useResource";
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
};

export function TrackList({ items, status, error, hasMore, loadingMore, onMore, onRetry, empty }: Props) {
  if (status === "loading") return <div>{[0, 1, 2, 3].map((i) => <TrackSkeleton key={i} />)}</div>;
  if (status === "error") return <ErrorState message={error} onRetry={onRetry} />;
  if (items.length === 0) return <EmptyState title={empty.title} action={empty.action}>{empty.text}</EmptyState>;
  return (
    <div>
      {items.map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
      {hasMore && (
        <div className="flex justify-center py-6">
          <Button variant="outline" loading={loadingMore} onClick={onMore}>Play more tracks</Button>
        </div>
      )}
      {!hasMore && <p className="py-8 text-center font-display text-2xl font-black uppercase text-muted">End of tape</p>}
    </div>
  );
}
