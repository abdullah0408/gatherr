import * as React from "react";
import DiscoverSidebar from "@/components/common/DiscoverSidebar";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import Post from "@/components/posts/Post";

export default async function Home() {

  const posts = await prisma.post.findMany({
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
      }
    },
  });

  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {/* <YourFeed /> */}
      </div>
      <DiscoverSidebar />
    </main>
  );
}
