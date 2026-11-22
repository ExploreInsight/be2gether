"use client";
import { useSession } from "@/stores/session";

/** A filled signal-coloured tape mark when there are unread alerts. */
export function UnreadMark() {
  const unread = useSession((s) => s.unread);
  if (unread <= 0) return null;
  return (
    <span className="ml-auto inline-flex min-w-6 items-center justify-center bg-signal px-1.5 text-sm font-black text-on-signal tnum">
      {unread > 99 ? "99+" : unread}
      <span className="sr-only"> unread</span>
    </span>
  );
}
