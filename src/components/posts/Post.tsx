// import { PostData } from "@/lib/types";
import UserProfilePicture from "@/components/UserProfilePicture";
import Link from "next/link";
// import { formatRelativeTime } from "@/lib/utils";
// interface PostProps {
//     post: PostData;
// }
const Post = ({ post }: any) => {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.author.username}`}>
        <UserProfilePicture profilePictureUrl={post.author.profilePicture} />
        </Link>
        <div>
          <Link href={`/users/${post.author.username}`} className="block font-medium hover:underline">
            {post.author.name}
          </Link>
          <Link href={`/posts/${post.id}`} className="block text-sm text-muted-foreground hover:underline">
          {/* {formatRelativeTime(post.createdAt)} */}
          </Link>
        </div>
      </div>
      <div className="whitespace-pre-line break-words">
        {post.content}
      </div>
    </article>
  )
}

export default Post