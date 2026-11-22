"use client";
import Link from "next/link";
import { post } from "@/lib/api";
import { displayName, tapeAge } from "@/lib/format";
import { toast } from "@/stores/toast";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/State";
import { Skeleton } from "@/components/ui/Skeleton";
import type { ReportRow } from "@/types";

export function ReportList({ rows, loading, onChanged }: { rows: ReportRow[] | null; loading: boolean; onChanged: () => void }) {
  async function act(id: string, action: "dismiss" | "remove") {
    try {
      await post(`/api/admin/reports/${id}`, { action });
      toast.ok(action === "remove" ? "Post removed." : "Report dismissed.");
      onChanged();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  if (loading) return <Skeleton className="h-24" />;
  if (!rows || rows.length === 0) return <EmptyState title="No open reports">Nothing needs a decision right now.</EmptyState>;
  return (
    <ul className="space-y-4">
      {rows.map((r) => (
        <li key={r.id} className="space-y-2 rounded-3xl border border-rule bg-card p-5 shadow-card">
          <p className="text-sm text-muted">Reported by @{r.reporter.username} · {tapeAge(r.createdAt)} ago</p>
          <p className="font-semibold">&ldquo;{r.reason}&rdquo;</p>
          <p className="rounded-2xl bg-hover p-3">
            <Link href={`/post/${r.post.id}`} className="font-bold underline">{displayName(r.post.author)}</Link>: {r.post.content ?? "(photo only)"}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="danger" onClick={() => act(r.id, "remove")}>Remove post</Button>
            <Button size="sm" variant="outline" onClick={() => act(r.id, "dismiss")}>Dismiss</Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
