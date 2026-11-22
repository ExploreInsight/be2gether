"use client";
import { useClerk } from "@clerk/nextjs";
import { useSession } from "@/stores/session";
import { toast } from "@/stores/toast";

const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";
const useClerkMaybe = PREVIEW ? () => null : useClerk;

/** Returns a guard: runs the action when signed in, otherwise opens sign-in. */
export function useRequireAuth() {
  const me = useSession((s) => s.me);
  const clerk = useClerkMaybe();
  return (action: () => void) => {
    if (me) return action();
    if (clerk) clerk.openSignIn();
    else toast.error("Sign in to do that.");
  };
}
