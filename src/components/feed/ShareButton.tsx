"use client";
import { Share2 } from "lucide-react";
import { toast } from "@/stores/toast";
import { cn } from "@/lib/utils";

type Props = { path: string; title: string; text?: string; label?: string; className?: string; withText?: boolean };

/** Native share sheet where available, otherwise copies the link. */
export function ShareButton({ path, title, text, label = "Share", className, withText = false }: Props) {
  async function share() {
    const url = `${window.location.origin}${path}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.ok("Link copied.");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        toast.ok("Link copied.");
      } catch {
        toast.error("Could not share. Copy the address from your browser instead.");
      }
    }
  }
  return (
    <button
      type="button"
      onClick={share}
      aria-label={label}
      className={cn("inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-bold text-muted hover:bg-hover hover:text-ink", className)}
    >
      <Share2 aria-hidden className="size-5" strokeWidth={2.25} />
      {withText && <span>{label}</span>}
    </button>
  );
}
