"use server";

import prisma from "./prisma";
import { auth } from "@clerk/nextjs/server";

const getFriendSuggestions = async (howMany: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: userId
        }
      },
      take: howMany
    });
    return users;
  } catch (error) {
    console.error("Error fetching friend suggestions:", error);

    return null;
  }
};

export default getFriendSuggestions;

