"use client";
import { useComposer } from "@/stores/composer";
import { Dialog } from "@/components/ui/Dialog";
import { Composer } from "./Composer";

export function ComposerDialog() {
  const open = useComposer((s) => s.open);
  const setOpen = useComposer((s) => s.setOpen);
  return (
    <Dialog open={open} onOpenChange={setOpen} title="Record a track">
      <Composer autoFocus />
    </Dialog>
  );
}
