import { db } from "@/db";

// export type PostWithData = Post & {
//     topic: { slug: string };
//     user?: { name?: string };
//     _count: { comments: number };
// };

export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];

// export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];
export function fetchPostsByTopicSlug(slug: string) {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });


}

export function fetchTopPosts() {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
        take: 10,
        orderBy: [{
            comments: {
                _count: 'desc'

            }
        }]
    });
}