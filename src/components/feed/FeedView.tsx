"use client";
import { useEffect, useState } from "react";
import { usePagedList } from "@/hooks/usePagedList";
import { useComposer } from "@/stores/composer";
import { useSession } from "@/stores/session";
import { Button } from "@/components/ui/Button";
import { AuthButtons } from "@/components/layout/AuthButtons";
import type { Side, Track } from "@/types";
import { Composer } from "./Composer";
import { Greeting } from "./Greeting";
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
      <Greeting />
      <SideTabs side={side} onChange={setPicked} />
      {me ? (
        <section aria-label="New post" className="hidden rounded-3xl border border-rule bg-card p-5 shadow-card lg:block"><Composer /></section>
      ) : status === "ready" ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-rule bg-card p-5 shadow-card">
          <p className="font-semibold">Sign in to follow friends and share your own posts.</p>
          <AuthButtons />
        </div>
      ) : null}
      <div role="tabpanel" aria-labelledby={`tab-${side}`}>
        <TrackList
          byDay
          items={list.items}
          status={status === "ready" ? list.status : "loading"}
          error={list.error}
          hasMore={list.hasMore}
          loadingMore={list.loadingMore}
          onMore={list.loadMore}
          onRetry={list.reload}
          empty={
            side === "friends"
              ? { title: "Your friends feed is quiet", text: "Follow a few people and their posts show up here, newest first.", action: <Button variant="outline" onClick={() => setPicked("everyone")}>See everyone</Button> }
              : { title: "Nothing shared yet", text: "Be the first to share something today." }
          }
        />
      </div>
    </div>
  );
}
