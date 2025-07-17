import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";
export default  function Home() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
			<div className="md:col-span-3">
				<h1 className="text-xl m-2">Top Posts</h1>
				<PostList fetchData={() => fetchTopPosts()} />
			</div>
			<div className="border shadow py-3 px-2 mt-4 md:mt-0">
				<TopicCreateForm />
				<Divider className="my-2" />
				<h2 className="text-xl my-2">Topics</h2>
				<TopicList />
			</div>
		</div>
	);
}

