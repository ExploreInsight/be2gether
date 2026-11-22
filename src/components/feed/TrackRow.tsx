"use client";
import Link from "next/link";
import { displayName, tapeAge, trackNumber, ageLabel } from "@/lib/format";
import { useNow } from "@/hooks/useNow";
import { useComposer } from "@/stores/composer";
import { useEngagement } from "@/stores/engagement";
import { cn } from "@/lib/utils";
import type { Track } from "@/types";
import { TrackActions } from "./TrackActions";
import { TrackBody } from "./TrackBody";

/** One track on the tape: number, author, text, optional photo, actions, age. */
export function TrackRow({ track, index, onRemoved }: { track: Track; index?: number; onRemoved?: () => void }) {
  const hidden = useEngagement((s) => s.hidden[track.id]);
  const fresh = useComposer((s) => s.lastPosted?.id === track.id);
  const now = useNow();
  if (hidden) return null;
  return (
    <article className={cn("grid gap-x-3 border-b-[1.5px] border-ink py-[var(--row-pad)]", index === undefined ? "grid-cols-[1fr_auto]" : "grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.25rem_1fr_auto]", fresh && "animate-[tape-in_0.35s_ease-out_both]")}>
      {index !== undefined && <div className="font-display text-4xl font-black leading-none text-accent tnum" aria-hidden>{trackNumber(index + 1)}</div>}
      <div className="min-w-0">
        <header className="flex flex-wrap items-baseline gap-x-2">
          <Link href={`/profile/${track.author.username}`} className="font-bold hover:underline">{displayName(track.author)}</Link>
          <span className="text-sm text-muted">@{track.author.username}</span>
          {track.isDemo && <span className="border border-ink px-1 text-xs font-bold uppercase">demo</span>}
        </header>
        {track.content && <div className="mt-1"><TrackBody text={track.content} /></div>}
        {track.image && (
          <Link href={`/post/${track.id}`} className="mt-3 block max-w-md border-2 border-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={track.image} alt={`Photo from ${displayName(track.author)}`} loading="lazy" className="max-h-96 w-full object-cover" />
          </Link>
        )}
        <TrackActions track={track} onRemoved={onRemoved} />
      </div>
      <Link href={`/post/${track.id}`} className="w-14 text-right font-display text-2xl font-extrabold leading-none text-ink tnum hover:underline" title={ageLabel(track.createdAt)} aria-label={`Posted ${ageLabel(track.createdAt)}`}>
        {tapeAge(track.createdAt, now)}
      </Link>
    </article>
  );
}
