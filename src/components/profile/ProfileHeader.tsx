"use client";
import { useState } from "react";
import { CalendarDays, Link2, MapPin } from "lucide-react";
import { displayName } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FollowButton } from "@/components/people/FollowButton";
import type { Profile } from "@/types";
import { ShareButton } from "@/components/feed/ShareButton";
import { EditProfileDialog } from "./EditProfileDialog";

const Stat = ({ n, label }: { n: number; label: string }) => (
  <div><dt className="text-sm text-muted">{label}</dt><dd className="font-display text-xl font-extrabold leading-tight tnum">{n}</dd></div>
);

export function ProfileHeader({ profile, onSaved }: { profile: Profile; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  return (
    <header className="space-y-4 rounded-3xl border border-rule bg-card p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start gap-4">
        <Avatar user={profile} size={72} />
        <div className="min-w-[10rem] flex-1">
          <h1 className="break-words font-display text-3xl sm:text-4xl font-extrabold leading-[0.9]">{displayName(profile)}</h1>
          <p className="text-muted">@{profile.username}{profile.isDemo && <span className="ml-2 rounded-full bg-wash px-2 text-xs font-bold text-accent">demo</span>}</p>
        </div>
        {profile.isMe ? (
          <Button size="sm" variant="outline" className="max-sm:order-last max-sm:w-full" onClick={() => setEditing(true)}>Edit profile</Button>
        ) : (
          <FollowButton username={profile.username} initial={profile.isFollowing} />
        )}
      </div>
      {profile.bio && <p className="text-lg">{profile.bio}</p>}
      <ShareButton path={`/profile/${profile.username}`} title={`${displayName(profile)} on be2gether`} text={profile.bio ?? undefined} label="Share profile" withText className="-ml-3" />
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        {profile.location && <li className="flex items-center gap-1.5"><MapPin aria-hidden className="size-4" />{profile.location}</li>}
        {profile.website && <li className="flex items-center gap-1.5"><Link2 aria-hidden className="size-4" /><a href={profile.website} rel="noopener noreferrer nofollow" target="_blank" className="text-accent underline">{profile.website.replace(/^https?:\/\//, "")}</a></li>}
        <li className="flex items-center gap-1.5"><CalendarDays aria-hidden className="size-4" />Joined {new Date(profile.createdAt).toLocaleDateString("en", { month: "long", year: "numeric" })}</li>
      </ul>
      <dl className="flex gap-8"><Stat n={profile.posts} label="Posts" /><Stat n={profile.followers} label="Followers" /><Stat n={profile.following} label="Following" /></dl>
      {profile.isMe && editing && <EditProfileDialog profile={profile} open onOpenChange={setEditing} onSaved={onSaved} />}
    </header>
  );
}
