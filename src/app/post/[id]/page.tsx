import { PostView } from "@/components/post/PostView";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  return <PostView params={params} />;
}
