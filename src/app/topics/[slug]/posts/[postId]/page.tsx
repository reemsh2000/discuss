import paths from "@/path";
import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";
interface PostShowPageProps {
	params: Promise< {
		postId: string;
		slug: string;
	}>;
}
export default async function PostShowPage({ params }: PostShowPageProps) {
	const { slug, postId } = await params;
	await new Promise((resolve) => setTimeout(resolve, 40000));
	return (
		<div className="space-y-3">
			<Link className="decoration-solid underline" href={paths.topicShow(slug)}>
				{"<"} Back to {slug}
			</Link>
			<Suspense fallback={<PostShowLoading />}>
				<PostShow postId={postId} />
			</Suspense>

			<CommentCreateForm postId={postId} />
			<CommentList postId={postId} />
		</div>
	);
}
