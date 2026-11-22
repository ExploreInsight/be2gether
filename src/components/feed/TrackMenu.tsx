"use client";
import { useState } from "react";
import { Flag, MoreHorizontal, Trash2 } from "lucide-react";
import { useSession } from "@/stores/session";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useTrackActions } from "@/hooks/useTrackActions";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Field";
import type { Track } from "@/types";

export function TrackMenu({ track, onRemoved }: { track: Track; onRemoved?: () => void }) {
  const me = useSession((s) => s.me);
  const guard = useRequireAuth();
  const { remove, report } = useTrackActions(track);
  const [open, setOpen] = useState(false);
  const [dlg, setDlg] = useState<null | "delete" | "report">(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const mine = me?.id === track.author.id;

  return (
    <div className="relative ml-auto">
      <button type="button" aria-label="More actions" aria-expanded={open} className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-hover" onClick={() => setOpen(!open)}>
        <MoreHorizontal aria-hidden className="size-5" />
      </button>
      {open && (
        <div role="group" aria-label="Post actions" className="absolute bottom-full right-0 z-10 mb-1 w-44 overflow-hidden rounded-2xl border border-rule bg-card shadow-card">
          {mine ? (
            <button type="button" className="flex min-h-11 w-full items-center gap-2 px-3 text-left font-bold text-danger hover:bg-hover" onClick={() => { setOpen(false); setDlg("delete"); }}>
              <Trash2 aria-hidden className="size-4" />Delete
            </button>
          ) : (
            <button type="button" className="flex min-h-11 w-full items-center gap-2 px-3 text-left font-bold hover:bg-hover" onClick={() => { setOpen(false); guard(() => setDlg("report")); }}>
              <Flag aria-hidden className="size-4" />Report
            </button>
          )}
        </div>
      )}
      <Dialog open={dlg === "delete"} onOpenChange={(o) => !o && setDlg(null)} title="Delete this post?" description="This removes it and its replies for everyone.">
        <div className="flex gap-3">
          <Button variant="danger" loading={busy} onClick={async () => { setBusy(true); const ok = await remove(); setBusy(false); if (ok) { setDlg(null); onRemoved?.(); } }}>Delete</Button>
          <Button variant="outline" onClick={() => setDlg(null)}>Keep it</Button>
        </div>
      </Dialog>
      <Dialog open={dlg === "report"} onOpenChange={(o) => !o && setDlg(null)} title="Report post" description="An admin will review it.">
        <label htmlFor={`rr-${track.id}`} className="mb-1.5 block text-sm font-bold">What is wrong?</label>
        <Textarea id={`rr-${track.id}`} value={reason} maxLength={300} onChange={(e) => setReason(e.target.value)} />
        <Button className="mt-4" loading={busy} disabled={!reason.trim()} onClick={async () => { setBusy(true); const ok = await report(reason); setBusy(false); if (ok) { setDlg(null); setReason(""); } }}>Send report</Button>
      </Dialog>
    </div>
  );
}
