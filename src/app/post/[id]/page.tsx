import { getPost } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Post not found" };

  const author = post.author.name ?? post.author.username;
  const preview = post.content?.trim().slice(0, 140);
  return {
    title: `${author} on be2gether`,
    description: preview || `A post by ${author}`,
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, dbUserId] = await Promise.all([getPost(id), getDbUserId()]);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <PostCard post={post} dbUserId={dbUserId} />
    </div>
  );
}
