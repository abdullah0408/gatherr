"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createPostSchema } from "@/lib/validations";
import { postDataInclude } from "./types";

const submitPost = async (input: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const { content } = createPostSchema.parse({ content: input });

  try {
    const newPost = await prisma.post.create({
      data: {
        content: content,
        authorId: userId,
      },
      include: postDataInclude
    });

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export default submitPost;
