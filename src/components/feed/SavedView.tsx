"use client";
import Link from "next/link";
import { usePagedList } from "@/hooks/usePagedList";
import { useSession } from "@/stores/session";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/State";
import { AuthButtons } from "@/components/layout/AuthButtons";
import type { Track } from "@/types";
import { TrackList } from "./TrackList";

export function SavedView() {
  const me = useSession((s) => s.me);
  const status = useSession((s) => s.status);
  const list = usePagedList<Track>(me ? "/api/saved" : null);
  return (
    <div className="space-y-6">
      <h1 className="border-b-2 border-ink pb-2 font-display text-5xl font-black uppercase leading-none">Saved</h1>
      {status === "ready" && !me ? (
        <EmptyState title="Sign in to see saved tracks" action={<AuthButtons />}>Tracks you bookmark show up here, only for you.</EmptyState>
      ) : (
        <TrackList {...list} status={status === "ready" ? list.status : "loading"} onMore={list.loadMore} onRetry={list.reload}
          empty={{ title: "Nothing saved yet", text: "Tap the bookmark on any track to keep it here.", action: <Link href="/"><Button variant="outline">Back to the feed</Button></Link> }} />
      )}
    </div>
  );
}
