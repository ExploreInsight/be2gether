import { create } from "zustand";
import type { Track } from "@/types";

type ComposerState = {
  open: boolean;
  lastPosted: Track | null;
  setOpen: (o: boolean) => void;
  posted: (t: Track) => void;
};

export const useComposer = create<ComposerState>((set) => ({
  open: false,
  lastPosted: null,
  setOpen: (open) => set({ open }),
  posted: (lastPosted) => set({ lastPosted, open: false }),
}));
