import * as React from "react";
import DiscoverSidebar from "@/components/common/DiscoverSidebar";
import RenderPosts from "@/components/common/RenderFeedPosts";

export default async function Home() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <RenderPosts />
      <DiscoverSidebar />
    </main>
  );
}
