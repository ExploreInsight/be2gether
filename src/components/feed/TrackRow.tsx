"use client";
import Link from "next/link";
import { ageLabel, displayName, tapeAge } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useNow } from "@/hooks/useNow";
import { useComposer } from "@/stores/composer";
import { useEngagement } from "@/stores/engagement";
import { Avatar } from "@/components/ui/Avatar";
import type { Track } from "@/types";
import { TrackActions } from "./TrackActions";
import { TrackBody } from "./TrackBody";

/** One post: a soft card with round avatar, text, optional photo and actions. */
export function TrackRow({ track, onRemoved }: { track: Track; index?: number; onRemoved?: () => void }) {
  const hidden = useEngagement((s) => s.hidden[track.id]);
  const fresh = useComposer((s) => s.lastPosted?.id === track.id);
  const now = useNow();
  if (hidden) return null;
  return (
    <article className={cn("mb-4 flex gap-3 rounded-3xl border border-rule bg-card p-4 shadow-card sm:p-5", fresh && "animate-[rise_0.4s_ease-out_both]")}>
      <Link href={`/profile/${track.author.username}`} aria-label={`${displayName(track.author)}'s profile`} className="shrink-0"><Avatar user={track.author} size={44} /></Link>
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-baseline gap-x-2">
          <Link href={`/profile/${track.author.username}`} className="font-bold hover:underline">{displayName(track.author)}</Link>
          <span className="hidden text-sm text-muted sm:inline">@{track.author.username}</span>
          {track.isDemo && <span className="rounded-full bg-wash px-2 text-xs font-bold text-accent">demo</span>}
          <Link href={`/post/${track.id}`} className="ml-auto text-sm font-semibold text-muted tnum hover:underline" title={ageLabel(track.createdAt)} aria-label={`Posted ${ageLabel(track.createdAt)}`}>
            {tapeAge(track.createdAt, now)}
          </Link>
        </header>
        {track.content && <div className="mt-1"><TrackBody text={track.content} /></div>}
        {track.image && (
          <Link href={`/post/${track.id}`} className="mt-3 block max-w-md overflow-hidden rounded-2xl border border-rule">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={track.image} alt={`Photo from ${displayName(track.author)}`} loading="lazy" className="max-h-96 w-full object-cover" />
          </Link>
        )}
        <TrackActions track={track} onRemoved={onRemoved} />
      </div>
    </article>
  );
}
