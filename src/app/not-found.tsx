import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/State";

export default function NotFound() {
  return (
    <EmptyState title="Post not found" action={<Link href="/"><Button>Back to the feed</Button></Link>}>
      We could not find that page. It may have been deleted, or the link has a typo.
    </EmptyState>
  );
}
