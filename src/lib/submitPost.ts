"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createPostSchema } from "@/lib/validations";

const submitPost = async (input: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const { content } = createPostSchema.parse({ content: input });

  try {
    await prisma.post.create({
      data: {
        content: content,
        authorId: userId,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export default submitPost;
