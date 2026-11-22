"use client";
import Link from "next/link";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEngagement } from "@/stores/engagement";
import { useSettings } from "@/stores/settings";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useTrackActions } from "@/hooks/useTrackActions";
import type { Track } from "@/types";
import { ShareButton } from "./ShareButton";
import { TrackMenu } from "./TrackMenu";

const btn = "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-bold text-muted hover:bg-hover hover:text-ink";

export function TrackActions({ track, onRemoved }: { track: Track; onRemoved?: () => void }) {
  const likeState = useEngagement((s) => s.likes[track.id]);
  const savedState = useEngagement((s) => s.saves[track.id]);
  const showCounts = useSettings((s) => s.showLikeCounts);
  const guard = useRequireAuth();
  const { like, save } = useTrackActions(track);
  const liked = likeState?.liked ?? track.liked;
  const count = likeState?.count ?? track.likeCount;
  const saved = savedState ?? track.saved;
  return (
    <div className="-ml-3 mt-2 flex items-center gap-0.5">
      <Link href={`/post/${track.id}`} className={btn} aria-label={`Reply. ${track.commentCount} ${track.commentCount === 1 ? "reply" : "replies"}`}>
        <MessageCircle aria-hidden className="size-5" strokeWidth={2.25} />
        <span className="tnum">{track.commentCount}</span>
      </Link>
      <button type="button" className={btn} aria-pressed={liked} aria-label={showCounts ? `Like. ${count} likes` : "Like"} onClick={() => guard(like)}>
        <Heart aria-hidden className={cn("size-5", liked && "animate-[pop_0.35s_ease-out] fill-pop stroke-pop")} strokeWidth={2.25} />
        {showCounts && <span className="tnum">{count}</span>}
      </button>
      <button type="button" className={btn} aria-pressed={saved} aria-label={saved ? "Remove from saved" : "Save"} onClick={() => guard(save)}>
        <Bookmark aria-hidden className={cn("size-5", saved && "fill-brand stroke-brand")} strokeWidth={2.25} />
      </button>
      <ShareButton path={`/post/${track.id}`} title={`${track.author.name ?? track.author.username} on be2gether`} text={track.content?.slice(0, 120) ?? undefined} label="Share post" />
      <TrackMenu track={track} onRemoved={onRemoved} />
    </div>
  );
}
