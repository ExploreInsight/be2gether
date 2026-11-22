import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/State";

export default function NotFound() {
  return (
    <EmptyState title="Track not found" action={<Link href="/"><Button>Back to the feed</Button></Link>}>
      That page is not on this tape. It may have been deleted, or the link has a typo.
    </EmptyState>
  );
}
