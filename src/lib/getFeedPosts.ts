import prisma from "@/lib/prisma";
import {PostData} from "@/lib/types";

async function getFeedPosts(): Promise<PostData[]> {
  try {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array if there's an error
  }
}

export default getFeedPosts;