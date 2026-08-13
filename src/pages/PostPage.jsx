import { useParams } from "react-router-dom";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";
import { Loader } from "../components";
import { PostActionDropdown } from "../components/PostActionDropdown";

function PostPage() {
	const { slug } = useParams();

	const { isLoading, data } = useToastQuery({
		queryKey: ["post", slug],
		queryFn: () => postService.getPostBySlug({ slug }),
	});

	return !isLoading ? (
		<section className="flex flex-col items-center my-18 pb-30">
			<div dangerouslySetInnerHTML={{ __html: data?.post?.body ?? "" }} className="typeset typeset-article max-w-[37em] relative" />
			<PostActionDropdown data={data} slug={slug} />
		</section>
	) : (
		<Loader />
	);
}

export default PostPage;
