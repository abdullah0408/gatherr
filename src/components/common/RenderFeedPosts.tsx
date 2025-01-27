import Post from "@/components/Post";
import PostEditor from "@/components/PostEditor";
import PublicFeed from "@/components/common/PublicFeed";
async function RenderPosts() {

  return (
    <div className="w-full min-w-0 space-y-5">
      <PostEditor />
      <PublicFeed /> 
    </div>
  );
}

export default RenderPosts;