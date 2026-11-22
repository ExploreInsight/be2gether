"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useResource } from "@/hooks/useResource";
import { ErrorState } from "@/components/ui/State";
import { Skeleton, TrackSkeleton } from "@/components/ui/Skeleton";
import { TrackRow } from "@/components/feed/TrackRow";
import type { TrackDetail } from "@/types";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function PostView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, status, error, reload } = useResource<TrackDetail>(`/api/posts/${id}`);
  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-semibold hover:underline"><ArrowLeft aria-hidden className="size-5" />Feed</Link>
      {status === "loading" && <><TrackSkeleton /><Skeleton className="h-11" /></>}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {data && (
        <>
          <h1 className="sr-only">Track by {data.author.username}</h1>
          <TrackRow track={data} index={0} onRemoved={() => router.push("/")} />
          <section aria-labelledby="replies" className="space-y-4">
            <h2 id="replies" className="font-display text-3xl font-black uppercase leading-none">Replies <span className="tnum">{data.comments.length}</span></h2>
            <CommentForm postId={data.id} onAdded={reload} />
            <CommentList comments={data.comments} onChanged={reload} />
          </section>
        </>
      )}
    </div>
  );
}
