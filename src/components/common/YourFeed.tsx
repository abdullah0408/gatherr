// "use client"
// import Post from "@/components/posts/Post"
// import { PostData } from "@/lib/types"
// // import { useQuery } from "@tanstack/react-query"
// import { Loader2 } from "lucide-react"
// const YourFeed = () => {
//     const query = useQuery<PostData[]>({
//         queryKey: ["post-feed", "for-you"],
//         queryFn: async () => {
//             const response = await fetch("/api/posts/for-you");
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         },
//     })

//     if(query.status === "pending") {
//         return <Loader2 className="mx-auto animate-spin"/>
//     } if (query.status === "error") {
//         return <p className="text-center text-destructive">There was an error fetching your feed</p>
//     }

//     return (
//         <>
//             {query.data.map((post) => (
//                 <Post key={post.id} post={post}/>
//             ))}
//         </>
//     )
// }

// export default YourFeed