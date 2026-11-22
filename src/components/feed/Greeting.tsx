"use client";
import { displayName } from "@/lib/format";
import { useSession } from "@/stores/session";

function part(h: number) {
  return h < 5 ? "Hi" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

/** One plain, human line above the feed. */
export function Greeting() {
  const me = useSession((s) => s.me);
  const status = useSession((s) => s.status);
  if (status !== "ready") return <h1 className="sr-only">Home</h1>;
  const text = me ? `${part(new Date().getHours())}, ${displayName(me).split(" ")[0]}` : "Welcome to be2gether";
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold leading-tight">{text}</h1>
      <p className="text-muted">{me ? "Here is what your friends are up to." : "A friendly place to share the day with people you know."}</p>
    </div>
  );
}
