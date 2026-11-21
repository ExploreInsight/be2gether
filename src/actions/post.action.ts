"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const post = await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    });
    revalidatePath("/");
    revalidatePath(`/post/${post.id}`);
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

const postInclude = {
  author: {
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
    },
  },
  comments: {
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc" as const,
    },
  },
  likes: {
    select: {
      userId: true,
    },
  },
  _count: {
    select: {
      likes: true,
      comments: true,
    },
  },
};

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: postInclude,
    });
    return posts;
  } catch (error) {
    console.log("Error in getPosts", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getPost(postId: string) {
  try {
    return await prisma.post.findUnique({
      where: { id: postId },
      include: postInclude,
    });
  } catch (error) {
    console.error("Error in getPost", error);
    throw new Error("Failed to fetch post");
  }
}

export async function toggleLike(postId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    // check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (existingLike) {
      // unlike the post
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      // like the post and create a notification and $transaction is used to ensure atomicity
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),
        ...(post.authorId !== userId
          ? [
              prisma.notification.create({
                data: {
                  type: "LIKE",
                  userId: post.authorId, // author of post
                  creatorId: userId, // user who liked the post
                  postId,
                },
              }),
            ]
          : []),
      ]);
    }

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function createComment(postId: string, content: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    if (!content) throw new Error("Content is required");

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");

    // create a comment and create a notification in a $transaction
    const [comment] = await prisma.$transaction(async (tx) => {
      // create the comment
      const newComment = await tx.comment.create({
        data: {
          content,
          postId,
          authorId: userId,
        },
      });

      // create a notification of commenting on someone's else post
      if (post.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: post.authorId, // posts author
            creatorId: userId, // user who commented
            postId,
            commentId: newComment.id, // id of the comment created
          },
        });
      }
      return [newComment];
    });
    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
    return { success: true, comment };
  } catch (error) {
    console.error("Failed to create comment:", error);
    return { success: false, error: "Failed to create comment" };
  }
}

export async function deletePost(postId: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");

    if (post.authorId !== userId)
      throw new Error("Unauthorized - You can only delete your own posts");

    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
