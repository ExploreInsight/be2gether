"use client";
import { useState } from "react";
import { MAX_POST_LENGTH } from "@/lib/constants";
import { post } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useComposer } from "@/stores/composer";
import { useSession } from "@/stores/session";
import { toast } from "@/stores/toast";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import type { Track } from "@/types";
import { PhotoPicker } from "./PhotoPicker";

/** The only element above the feed. */
export function Composer({ autoFocus = false }: { autoFocus?: boolean }) {
  const me = useSession((s) => s.me);
  const posted = useComposer((s) => s.posted);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const left = MAX_POST_LENGTH - text.length;

  async function submit() {
    setBusy(true);
    try {
      const t = await post<Track>("/api/posts", { content: text, image });
      posted(t);
      setText("");
      setImage(null);
      toast.ok("Posted.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!me) return null;
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <label htmlFor="composer-text" className="sr-only">What's happening today?</label>
      <Textarea id="composer-text" autoFocus={autoFocus} value={text} maxLength={MAX_POST_LENGTH} placeholder="What's happening today?" onChange={(e) => setText(e.target.value)} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PhotoPicker url={image} onChange={setImage} />
        <div className="flex items-center gap-3">
          <span className={cn("text-sm tnum", left < 40 ? "font-bold text-danger" : "text-muted")} aria-live="polite">{left}<span className="sr-only"> characters left</span></span>
          <Button type="submit" loading={busy} disabled={!text.trim() && !image}>Post</Button>
        </div>
      </div>
    </form>
  );
}
