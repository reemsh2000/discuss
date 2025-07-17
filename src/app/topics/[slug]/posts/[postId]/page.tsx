import paths from "@/path";
import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
// interface PostShowPageProps {
// 	params: {
// 		postId: string;
// 		slug: string;
// 	};
// }
export default async function PostShowPage({ params }: never) {
	const { slug, postId } = await params;
	return (
		<div className="space-y-3">
			<Link className="decoration-solid underline" href={paths.topicShow(slug)}>
				{"<"} Back to {slug}
			</Link>

			<PostShow postId={postId} />
			<CommentCreateForm postId={postId} />
			<CommentList postId = {postId} />
		</div>
	);
}
