import { create } from "zustand";

type LikeState = { liked: boolean; count: number };

type EngagementState = {
  likes: Record<string, LikeState>;
  saves: Record<string, boolean>;
  follows: Record<string, boolean>;
  hidden: Record<string, true>;
  setLike: (id: string, v: LikeState) => void;
  setSave: (id: string, v: boolean) => void;
  setFollow: (username: string, v: boolean) => void;
  hide: (id: string) => void;
};

/** Optimistic overlays on server data. Components read a single id per selector. */
export const useEngagement = create<EngagementState>((set) => ({
  likes: {},
  saves: {},
  follows: {},
  hidden: {},
  setLike: (id, v) => set((s) => ({ likes: { ...s.likes, [id]: v } })),
  setSave: (id, v) => set((s) => ({ saves: { ...s.saves, [id]: v } })),
  setFollow: (u, v) => set((s) => ({ follows: { ...s.follows, [u]: v } })),
  hide: (id) => set((s) => ({ hidden: { ...s.hidden, [id]: true } })),
}));
