import Link from "next/link";
import paths from "@/path";
import { PostWithData } from "@/db/queries/posts";
interface PostListProps {
	fetchData: () => Promise<PostWithData[]>;
}

export const dynamic = "force-dynamic"; // forces SSR

export default async function PostList({ fetchData }: PostListProps) {
	const posts = await fetchData();
	const renderedPosts = posts.map((post: PostWithData) => {
		const topicSlug = post.topic.slug;

		if (!topicSlug) {
			throw new Error("Need a slug to link to a post");
		}

		return (
			<div key={post.id} className="border rounded p-2">
				<Link href={paths.postShow(topicSlug, post.id)}>
					<h3 className="text-lg font-bold">{post.title}</h3>
					<div className="flex flex-row gap-8">
						<p className="text-xs text-gray-400">By {post?.user?.name}</p>
						<p className="text-xs text-gray-400">{post?._count.comments} comments</p>
					</div>
				</Link>
			</div>
		);
	});

	return <div className="space-y-2">{posts.length > 0 ? renderedPosts : <div>No Posts to display</div>}</div>;
}
