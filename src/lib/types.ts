import { Prisma } from "@prisma/client";
// // export const userDataSelect = {
// //       id: true,
// //       name: true,
// //       username: true,
// //       profilePicture: true,
// // } satisfies Prisma.UserSelect;

export const postDataInclude = {
    author: {
        select: {
            name: true,
            username: true,
            profilePicture: true
        }
    }
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
    include: typeof postDataInclude
}>

export interface PostsPage {
    posts: PostData[];
    nextCursor: string | null;
}