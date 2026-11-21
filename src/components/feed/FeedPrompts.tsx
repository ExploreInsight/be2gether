import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function EmptyFeed({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="rounded-xl border border-dashed bg-card px-6 py-16 text-center">
      <p className="font-serif text-xl tracking-[-0.03em]">The feed is quiet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {signedIn
          ? "Write the first post. People you follow will show up here too."
          : "Sign in to post, follow people, and fill this feed."}
      </p>
      {!signedIn && (
        <SignInButton mode="modal">
          <Button className="mt-5">Sign in</Button>
        </SignInButton>
      )}
    </div>
  );
}

export function GuestPrompt() {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3">
      <p className="text-sm text-muted-foreground">Sign in to post and follow people.</p>
      <SignInButton mode="modal">
        <Button size="sm">Sign in</Button>
      </SignInButton>
    </div>
  );
}
