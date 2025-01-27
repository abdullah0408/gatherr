import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import submitPost from "./submitPost";
import { PostData, PostsPage } from "./types";
import { usePathname, useRouter } from "next/navigation";
import deletePost from "./deletePost";
import page from "@/app/(main)/bookmarks/page";
import next from "next";
import { any } from "zod";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>, Error, InfiniteData<PostsPage, string | null>, readonly unknown[]> = {
        queryKey: ["post-feed", "for-you"],
      };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data
        }
      })
      toast({
        description: "Posted successfully.",
      })
    },
    onError(error) {
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });

  return mutation;
}


export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>, Error, InfiniteData<PostsPage, string | null>, readonly unknown[]> = {queryKey: ["post-feed"]}

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          return{
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page: PostsPage) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter(p => p.id !== deletedPost.id)
            }))
          }
        }
      );
      toast({
        description: "Post deleted successfully.",
      })

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push("/");
      }
    },
    onError(error) {
      toast({
        variant: "destructive",
        description: "Failed to delete post. Please try again.",
      });
    },
  })

  return mutation;
}