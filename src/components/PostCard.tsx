'use client';

import { createComment, deletePost, getPosts, toggleLike } from "@/actions/post.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns'
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import toast from "react-hot-toast";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { HeartIcon, LogInIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { SharePostButton } from "./feed/SharePostButton";


type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number]

function PostCard({ post, dbUserId }: { post: Post, dbUserId: string | null }) {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(post.likes.some((like) => like.userId === dbUserId));
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked(!hasLiked);
      setOptimisticLikes(prev => prev + (hasLiked ? -1 : 1)); // Optimistic update
      await toggleLike(post.id)
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false)
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const res = await createComment(post.id, newComment);
      if (res?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
      }
    } catch (error) {
      toast.error("Failed to add comment")
    } finally {
      setIsCommenting(false)
    }
  }

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const res = await deletePost(post.id);
      if (res?.success) toast.success("Post deleted successfully");
      else throw new Error("Failed to delete post");
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <Card className="overflow-hidden gap-0 py-0">
      <div className="space-y-4 px-5 pt-5">
        <div className="flex gap-3">
          <Link href={`/profile/${post.author.username}`} className="shrink-0">
            <Avatar className="size-9 sm:size-10">
              <AvatarImage src={post.author.image ?? "/avatar.png"} />
            </Avatar>
          </Link>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/profile/${post.author.username}`}
                className="font-serif font-semibold tracking-[-0.02em] break-words"
              >
                {post.author.name ?? post.author.username}
              </Link>
              {dbUserId === post.author.id && (
                <DeleteAlertDialog isDeleting={isDeleting} onDelete={handleDeletePost} />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <Link href={`/profile/${post.author.username}`} className="truncate hover:underline">
                @{post.author.username}
              </Link>
              <span>&middot;</span>
              <span className="whitespace-nowrap">
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </span>
            </div>
          </div>
        </div>

        {post.content && (
          <p className="whitespace-pre-wrap text-[0.9375rem] leading-6 text-foreground break-words">
            {post.content}
          </p>
        )}

        {post.image && (
          <div className="-mx-5 overflow-hidden">
            <img
              src={post.image}
              alt="Post content"
              className="max-h-[32rem] w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 border-t [&>*]:w-full">
        {
          user ? (
            <Button
              variant='ghost'
              onClick={handleLike}
              disabled={isLiking}
              aria-pressed={hasLiked}
              aria-label={hasLiked ? "Unlike" : "Like"}
              className={`h-11 rounded-none gap-1.5 ${hasLiked ? 'text-destructive hover:text-destructive' : 'text-muted-foreground hover:text-destructive'}`}>
              {hasLiked ? (
                <HeartIcon className="size-4 fill-current" />
              ) : <HeartIcon className="size-4" />}
              <span>Like</span>
              <span className="tabular-nums">{optimisticLikes}</span>
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost" className="h-11 rounded-none gap-1.5 text-muted-foreground">
                <HeartIcon className="size-4" />
                <span>Like</span>
                <span className="tabular-nums">{optimisticLikes}</span>
              </Button>
            </SignInButton>
          )
        }
        <Button
          variant='ghost'
        className={`h-11 rounded-none gap-1.5 ${showComments ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
        onClick={()=> setShowComments(prev => !prev)}
        >
          <MessageCircleIcon  className={`size-4 ${showComments ? "fill-current" : ""}`} />
          <span>Comment</span>
          <span className="tabular-nums">{post.comments.length}</span>
        </Button>
        <SharePostButton postId={post.id} text={post.content} />
      </div>

      {showComments && (
        <div className="space-y-4 border-t px-5 py-4">
          <div className="space-y-4">
            {
              post.comments.map( comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={comment.author.image ?? "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-serif font-medium text-sm">{ comment.author.name ?? comment.author.username}</span>
                      <span className="text-sm text-muted-foreground">
                           @{comment.author.username}
                      </span>
                      <span className="text-sm text-muted-foreground">&middot;</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm leading-6 break-words">{comment.content}</p>
                  </div>
                 </div>
              ))
            }
          </div>

          {user ? (
            <div className="flex gap-3">
              <Avatar className="size-8 flex-shrink-0">
                <AvatarImage src={user?.imageUrl || "/avatar.png"} />
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-20 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    className="flex items-center gap-2"
                    disabled={!newComment.trim() || isCommenting}
                  >
                    {isCommenting ? (
                      "Posting..."
                    ) : (
                      <>
                        <SendIcon className="size-4" />
                        Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center rounded-lg border bg-muted/40 p-4">
              <SignInButton mode="modal">
                <Button variant="outline" className="gap-2">
                  <LogInIcon className="size-4" />
                  Sign in to comment
                </Button>
              </SignInButton>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default PostCard
