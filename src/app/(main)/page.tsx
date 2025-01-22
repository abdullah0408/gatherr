import * as React from "react";
import DiscoverSidebar from "@/components/common/DiscoverSidebar";
import PostEditor from "@/components/posts/editor/PostEditor";

export default function Home() {

  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {/* {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))} */}
        {/* <YourFeed /> */}
      </div>
      <DiscoverSidebar />
    </main>
  );
}
