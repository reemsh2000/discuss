import { db } from "@/db";
import type { Post } from "@prisma/client";

export type PostWithData = Post & {
    topic: { slug: string };
    user: { name: string };
    _count: { comments: number };
};

// export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];
export async function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
    const posts = await db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
    // Map user.name null to empty string or handle as needed
    return posts.map((post) => ({
        ...post,
        user: { name: post.user.name ?? "" },
    }));
}

// export function fetchTopPosts(): Promise<PostWithData[]> {
//     return db.post.findMany({
//         where: { isTop: true },
//         include: {
//             topic: { select: { slug: true } },
//             user: { select: { name: true } },
//             _count: { select: { comments: true } },
//         },
//     });
// }