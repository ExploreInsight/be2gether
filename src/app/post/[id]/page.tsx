import type { Metadata } from "next";
import { PostView } from "@/components/post/PostView";
import { getTrack } from "@/server/posts";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const t = await getTrack((await params).id, null);
    const who = t.author.name ?? t.author.username;
    const text = (t.content ?? "Shared a photo").slice(0, 160);
    return {
      title: `${who} on be2gether`,
      description: text,
      openGraph: { title: `${who} on be2gether`, description: text, type: "article", ...(t.image ? { images: [t.image] } : {}) },
      twitter: { card: t.image ? "summary_large_image" : "summary" },
    };
  } catch {
    return {};
  }
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  return <PostView params={params} />;
}
