import { create } from "zustand";
import { api } from "@/lib/api";
import type { Me } from "@/types";

type SessionState = {
  status: "idle" | "loading" | "ready";
  me: Me | null;
  unread: number;
  load: () => Promise<void>;
  setUnread: (n: number) => void;
};

export const useSession = create<SessionState>((set, get) => ({
  status: "idle",
  me: null,
  unread: 0,
  load: async () => {
    if (get().status !== "idle") return;
    set({ status: "loading" });
    try {
      const me = await api<Me | null>("/api/me");
      set({ me, status: "ready" });
      if (me) {
        const { unread } = await api<{ unread: number }>("/api/alerts/unread");
        set({ unread });
      }
    } catch {
      set({ me: null, status: "ready" });
    }
  },
  setUnread: (unread) => set({ unread }),
}));
