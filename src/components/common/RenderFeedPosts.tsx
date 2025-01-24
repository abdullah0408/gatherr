import Post from "@/components/Post";
import PostEditor from "@/components/PostEditor";
import getFeedPosts from "@/lib/getFeedPosts";
async function RenderPosts() {
  const posts = await getFeedPosts();

  return (
    <div className="w-full min-w-0 space-y-5">
      <PostEditor />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default RenderPosts;