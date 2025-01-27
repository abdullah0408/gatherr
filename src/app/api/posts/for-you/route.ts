import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { postDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const { userId } = await auth();

    if (!userId) {
      return new Response("User is not authenticated", { status: 401 });
    }
    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[posts.length - 1].id : null;
    // pageSize

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    }
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Error: Could not fetch posts", {
      status: 500,
    });
  }
}
