"use client";

import { useState } from "react";
import { Share2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function postShareUrl(postId: string) {
  return `${window.location.origin}/post/${postId}`;
}

export function SharePostButton({
  postId,
  text,
  className,
}: {
  postId: string;
  text?: string | null;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = postShareUrl(postId);
    const payload = {
      title: "be2gether",
      text: text?.trim() || "A post on be2gether",
      url,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "h-11 w-full rounded-none gap-1.5 text-muted-foreground hover:text-primary",
        className
      )}
      onClick={share}
    >
      <Share2Icon className="size-4" />
      <span>{copied ? "Copied" : "Share"}</span>
    </Button>
  );
}
