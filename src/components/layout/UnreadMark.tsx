"use client";
import { useSession } from "@/stores/session";

/** A filled pop-coloured dot when there are unread alerts. */
export function UnreadMark() {
  const unread = useSession((s) => s.unread);
  if (unread <= 0) return null;
  return (
    <span className="ml-auto inline-flex min-w-6 items-center justify-center rounded-full bg-pop px-2 text-sm font-extrabold text-on-pop tnum">
      {unread > 99 ? "99+" : unread}
      <span className="sr-only"> unread</span>
    </span>
  );
}
