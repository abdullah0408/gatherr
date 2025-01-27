"use server"
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { postDataInclude } from "./types";
const deletePost = async (id: string) => {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.authorId !== userId) {
        throw new Error("User is not authorized to delete this post");
    }

    const deletedPost = await prisma.post.delete({
        where: {
            id
        },
        include: postDataInclude
    });

    return deletedPost;
}

export default deletePost