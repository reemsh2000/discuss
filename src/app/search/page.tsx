import { redirect } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTerm } from "@/db/queries/posts";
interface SearchPageProps {
	searchParams: Promise<{ term: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { term } = await searchParams;
	if (!term) {
		redirect("/");
	}
	return (
		<div>
			<PostList fetchData={() => fetchPostsByTerm(term)} />
		</div>
	);
}
