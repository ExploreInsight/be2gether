"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/stores/session";

const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

/** Sign in / sign up for guests, Clerk's account menu for people signed in. */
export function AuthButtons({ onSpine = false }: { onSpine?: boolean }) {
  const me = useSession((s) => s.me);
  const status = useSession((s) => s.status);
  if (status !== "ready") return <span className="block h-11 w-24" aria-hidden />;
  if (me) {
    if (PREVIEW) return <span className="text-sm font-semibold">@{me.username}</span>;
    return <UserButton appearance={{ elements: { avatarBox: "size-10 rounded-none" } }} />;
  }
  const tone = onSpine ? "border-2 border-on-spine text-on-spine hover:bg-on-spine hover:text-spine" : "";
  if (PREVIEW) return <Button size="sm" variant="outline" className={tone}>Sign in</Button>;
  return (
    <div className="flex gap-2">
      <SignInButton mode="modal"><Button size="sm" variant="outline" className={tone}>Sign in</Button></SignInButton>
      <SignUpButton mode="modal"><Button size="sm" variant="signal">Join</Button></SignUpButton>
    </div>
  );
}
