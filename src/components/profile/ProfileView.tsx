"use client";
import { use, useState } from "react";
import { usePagedList } from "@/hooks/usePagedList";
import { useResource } from "@/hooks/useResource";
import { cn } from "@/lib/utils";
import { ErrorState } from "@/components/ui/State";
import { Skeleton } from "@/components/ui/Skeleton";
import { TrackList } from "@/components/feed/TrackList";
import type { Profile, Track } from "@/types";
import { ProfileHeader } from "./ProfileHeader";

export function ProfileView({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [tab, setTab] = useState<"posts" | "likes">("posts");
  const prof = useResource<Profile>(`/api/users/${username}`);
  const list = usePagedList<Track>(prof.data ? `/api/users/${username}/posts?tab=${tab}` : null);
  if (prof.status === "error") return <ErrorState message={prof.error} onRetry={prof.reload} />;
  if (!prof.data) return <div className="space-y-4"><Skeleton className="h-16 w-2/3" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-24" /></div>;
  return (
    <div className="space-y-6">
      <ProfileHeader profile={prof.data} onSaved={prof.reload} />
      <div role="tablist" aria-label="Profile tabs" className="flex gap-2">
        {(["posts", "likes"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("min-h-11 rounded-full px-5 font-bold", tab === t ? "bg-brand text-on-brand" : "border border-line bg-card hover:bg-hover")}>{t === "posts" ? "Posts" : "Liked"}</button>
        ))}
      </div>
      <TrackList {...list} onMore={list.loadMore} onRetry={list.reload}
        empty={{ title: tab === "posts" ? "No posts yet" : "Nothing liked yet", text: prof.data.isMe ? "Share your first post with the New post button." : "Check back later." }} />
    </div>
  );
}
