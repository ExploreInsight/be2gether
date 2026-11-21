import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function PostNotFound() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-card px-6 py-16 text-center">
      <p className="font-serif text-2xl tracking-[-0.03em]">That post is gone</p>
      <p className="mt-2 text-sm text-muted-foreground">The link doesn't match a post anymore.</p>
      <Button className="mt-6" asChild>
        <Link href="/">
          <HomeIcon className="size-4" />
          Back to the feed
        </Link>
      </Button>
    </div>
  );
}
