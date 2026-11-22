"use client";
import { useState } from "react";
import { del } from "@/lib/api";
import { useResource } from "@/hooks/useResource";
import { toast } from "@/stores/toast";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

export function DemoPanel() {
  const stats = useResource<{ users: number; posts: number }>("/api/admin/demo");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const d = stats.data;
  async function remove() {
    setBusy(true);
    try {
      const r = await del<{ users: number; posts: number }>("/api/admin/demo");
      toast.ok(`Removed ${r.users} demo people and ${r.posts} demo posts.`);
      setOpen(false);
      stats.reload();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section aria-labelledby="demo" className="space-y-3">
      <h2 id="demo" className="font-display text-xl font-extrabold leading-tight">Demo content</h2>
      <p className="text-muted">Sample people and posts are flagged demo. Removing them never touches real accounts or posts.</p>
      <p className="tnum font-semibold">{d ? `${d.users} demo people, ${d.posts} demo posts` : "Counting…"}</p>
      <Button variant="danger" disabled={!d || (d.users === 0 && d.posts === 0)} onClick={() => setOpen(true)}>Remove demo content</Button>
      <Dialog open={open} onOpenChange={setOpen} title="Remove demo content?" description="Deletes every row flagged demo. This cannot be undone.">
        <div className="flex gap-3">
          <Button variant="danger" loading={busy} onClick={remove}>Remove</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
      </Dialog>
    </section>
  );
}
