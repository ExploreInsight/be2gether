"use client";
import { useState } from "react";
import { post } from "@/lib/api";
import { useEngagement } from "@/stores/engagement";
import { useSession } from "@/stores/session";
import { toast } from "@/stores/toast";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Button } from "@/components/ui/Button";

export function FollowButton({ username, initial, size = "sm" }: { username: string; initial: boolean; size?: "sm" | "md" }) {
  const override = useEngagement((s) => s.follows[username]);
  const me = useSession((s) => s.me);
  const guard = useRequireAuth();
  const [busy, setBusy] = useState(false);
  const following = override ?? initial;
  if (me?.username === username) return null;

  async function toggle() {
    setBusy(true);
    useEngagement.getState().setFollow(username, !following);
    try {
      const r = await post<{ following: boolean }>(`/api/users/${username}/follow`);
      useEngagement.getState().setFollow(username, r.following);
    } catch (e) {
      useEngagement.getState().setFollow(username, following);
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Button size={size} variant={following ? "outline" : "solid"} loading={busy} aria-pressed={following} onClick={() => guard(toggle)}>
      {following ? "Following" : "Follow"}
      <span className="sr-only"> {username}</span>
    </Button>
  );
}
