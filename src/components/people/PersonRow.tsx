import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { displayName } from "@/lib/format";
import type { PersonRow as Person } from "@/types";
import { FollowButton } from "./FollowButton";

export function PersonRow({ person }: { person: Person }) {
  return (
    <li className="flex items-center gap-3 border-b border-ink/30 py-3">
      <Link href={`/profile/${person.username}`} className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar user={person} size={44} />
        <span className="min-w-0">
          <span className="block truncate font-bold">{displayName(person)}</span>
          <span className="block truncate text-sm text-muted">@{person.username}</span>
        </span>
      </Link>
      <FollowButton username={person.username} initial={person.isFollowing} />
    </li>
  );
}
