"use client";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { del } from "@/lib/api";
import { ageLabel, displayName, tapeAge } from "@/lib/format";
import { useNow } from "@/hooks/useNow";
import { toast } from "@/stores/toast";
import { Avatar } from "@/components/ui/Avatar";
import type { TrackComment } from "@/types";

export function CommentList({ comments, onChanged }: { comments: TrackComment[]; onChanged: () => void }) {
  const now = useNow();
  async function remove(id: string) {
    try {
      await del(`/api/comments/${id}`);
      toast.ok("Reply deleted.");
      onChanged();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  if (comments.length === 0) return <p className="py-6 text-muted">No replies yet. Say something kind.</p>;
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id} className="flex gap-3 border-b border-rule py-4">
          <Avatar user={c.author} size={36} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Link href={`/profile/${c.author.username}`} className="font-bold hover:underline">{displayName(c.author)}</Link>
              <time dateTime={c.createdAt} title={ageLabel(c.createdAt)} className="text-sm text-muted tnum">{tapeAge(c.createdAt, now)}</time>
            </div>
            <p className="whitespace-pre-wrap">{c.content}</p>
          </div>
          {c.canDelete && (
            <button type="button" aria-label={`Delete reply by ${displayName(c.author)}`} onClick={() => remove(c.id)} className="inline-flex size-11 shrink-0 items-center justify-center hover:bg-hover">
              <Trash2 aria-hidden className="size-4" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
