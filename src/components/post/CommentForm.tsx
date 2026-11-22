"use client";
import { useState } from "react";
import { MAX_COMMENT_LENGTH } from "@/lib/constants";
import { post } from "@/lib/api";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { toast } from "@/stores/toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

export function CommentForm({ postId, onAdded }: { postId: string; onAdded: () => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const guard = useRequireAuth();
  async function send() {
    setBusy(true);
    try {
      await post(`/api/posts/${postId}/comments`, { content: text });
      setText("");
      onAdded();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); guard(send); }}>
      <label htmlFor="reply" className="sr-only">Write a reply</label>
      <Input id="reply" value={text} maxLength={MAX_COMMENT_LENGTH} placeholder="Write a reply" onChange={(e) => setText(e.target.value)} />
      <Button type="submit" loading={busy} disabled={!text.trim()}>Reply</Button>
    </form>
  );
}
