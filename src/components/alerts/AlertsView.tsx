"use client";
import { useEffect } from "react";
import Link from "next/link";
import { post } from "@/lib/api";
import { displayName, tapeAge } from "@/lib/format";
import { useResource } from "@/hooks/useResource";
import { useSession } from "@/stores/session";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState, ErrorState } from "@/components/ui/State";
import { TrackSkeleton } from "@/components/ui/Skeleton";
import { AuthButtons } from "@/components/layout/AuthButtons";
import type { AlertItem } from "@/types";

const VERB = { LIKE: "liked your track", COMMENT: "replied to your track", FOLLOW: "started following you" } as const;

export function AlertsView() {
  const me = useSession((s) => s.me);
  const status = useSession((s) => s.status);
  const setUnread = useSession((s) => s.setUnread);
  const { data, status: st, error, reload } = useResource<AlertItem[]>(me ? "/api/alerts" : null);

  useEffect(() => {
    if (!data || !data.some((a) => !a.read)) return;
    post("/api/alerts").then(() => setUnread(0)).catch(() => {});
  }, [data, setUnread]);

  return (
    <div className="space-y-6">
      <h1 className="border-b-2 border-ink pb-2 font-display text-5xl font-black uppercase leading-none">Alerts</h1>
      {status === "ready" && !me && <EmptyState title="Sign in to see alerts" action={<AuthButtons />}>Likes, replies and new followers show up here.</EmptyState>}
      {me && st === "loading" && <TrackSkeleton />}
      {me && st === "error" && <ErrorState message={error} onRetry={reload} />}
      {data && data.length === 0 && <EmptyState title="All quiet">When friends like or reply to your tracks, you will see it here.</EmptyState>}
      <ul>
        {data?.map((a) => (
          <li key={a.id} className="border-b border-ink/30">
            <Link href={a.postId ? `/post/${a.postId}` : `/profile/${a.creator.username}`} className="flex gap-3 py-4 hover:bg-hover">
              <span className="mt-2 flex w-3 shrink-0 justify-center">
                {!a.read && <><span className="size-3 bg-signal" aria-hidden /><span className="sr-only">Unread</span></>}
              </span>
              <Avatar user={a.creator} size={40} />
              <span className="min-w-0 flex-1">
                <span><strong>{displayName(a.creator)}</strong> {VERB[a.type]}</span>
                {(a.commentSnippet || a.postSnippet) && <span className="mt-1 block truncate text-muted">{a.commentSnippet ?? a.postSnippet}</span>}
              </span>
              <span className="font-display text-xl font-extrabold tnum">{tapeAge(a.createdAt)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
