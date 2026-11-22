"use client";
import { useCallback } from "react";
import { del, post } from "@/lib/api";
import { toast } from "@/stores/toast";
import { useEngagement } from "@/stores/engagement";
import type { Track } from "@/types";

export function useTrackActions(track: Track) {
  const like = useCallback(async () => {
    const st = useEngagement.getState();
    const cur = st.likes[track.id] ?? { liked: track.liked, count: track.likeCount };
    st.setLike(track.id, { liked: !cur.liked, count: cur.count + (cur.liked ? -1 : 1) });
    try {
      const r = await post<{ liked: boolean; likeCount: number }>(`/api/posts/${track.id}/like`);
      useEngagement.getState().setLike(track.id, { liked: r.liked, count: r.likeCount });
    } catch (e) {
      useEngagement.getState().setLike(track.id, cur);
      toast.error((e as Error).message);
    }
  }, [track]);

  const save = useCallback(async () => {
    const st = useEngagement.getState();
    const cur = st.saves[track.id] ?? track.saved;
    st.setSave(track.id, !cur);
    try {
      const r = await post<{ saved: boolean }>(`/api/posts/${track.id}/save`);
      useEngagement.getState().setSave(track.id, r.saved);
      toast.ok(r.saved ? "Saved." : "Removed from saved.");
    } catch (e) {
      useEngagement.getState().setSave(track.id, cur);
      toast.error((e as Error).message);
    }
  }, [track]);

  const remove = useCallback(async () => {
    try {
      await del(`/api/posts/${track.id}`);
      useEngagement.getState().hide(track.id);
      toast.ok("Track deleted.");
      return true;
    } catch (e) {
      toast.error((e as Error).message);
      return false;
    }
  }, [track.id]);

  const report = useCallback(
    async (reason: string) => {
      try {
        await post(`/api/posts/${track.id}/report`, { reason });
        toast.ok("Thanks, an admin will take a look.");
        return true;
      } catch (e) {
        toast.error((e as Error).message);
        return false;
      }
    },
    [track.id],
  );

  return { like, save, remove, report };
}
