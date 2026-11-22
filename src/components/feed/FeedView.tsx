"use client";
import { useEffect, useState } from "react";
import { usePagedList } from "@/hooks/usePagedList";
import { useComposer } from "@/stores/composer";
import { useSession } from "@/stores/session";
import { Button } from "@/components/ui/Button";
import { AuthButtons } from "@/components/layout/AuthButtons";
import type { Side, Track } from "@/types";
import { Composer } from "./Composer";
import { SideTabs } from "./SideTabs";
import { TrackList } from "./TrackList";

export function FeedView() {
  const me = useSession((s) => s.me);
  const status = useSession((s) => s.status);
  const [picked, setPicked] = useState<Side | null>(null);
  const side: Side = picked ?? (me ? "friends" : "everyone");
  const url = status === "ready" ? `/api/feed?side=${side}` : null;
  const list = usePagedList<Track>(url);
  const last = useComposer((s) => s.lastPosted);

  useEffect(() => {
    if (last) list.prepend(last);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last]);

  return (
    <div className="space-y-6">
      <h1 className="sr-only">Feed</h1>
      <SideTabs side={side} onChange={setPicked} />
      {me ? (
        <section aria-label="Record a track" className="hidden lg:block"><Composer /></section>
      ) : status === "ready" ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-2 border-ink p-4">
          <p className="font-semibold">Sign in to follow friends and record your own tracks.</p>
          <AuthButtons />
        </div>
      ) : null}
      <div role="tabpanel" aria-labelledby={`tab-${side}`}>
        <TrackList
          items={list.items}
          status={status === "ready" ? list.status : "loading"}
          error={list.error}
          hasMore={list.hasMore}
          loadingMore={list.loadingMore}
          onMore={list.loadMore}
          onRetry={list.reload}
          empty={
            side === "friends"
              ? { title: "Side A is quiet", text: "Follow a few people and their tracks land here, newest first.", action: <Button variant="outline" onClick={() => setPicked("everyone")}>Play Side B</Button> }
              : { title: "Nothing recorded yet", text: "Be the first to record a track today." }
          }
        />
      </div>
    </div>
  );
}
