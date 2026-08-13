import { useParams } from "react-router-dom";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";
import { Loader } from "../components";
import { PostActionDropdown } from "../components/PostActionDropdown";
import {BackButton} from "@/components/BackButton";

function PostPage() {
	const { slug } = useParams();

	const { isLoading, data } = useToastQuery({
		queryKey: ["post", slug],
		queryFn: () => postService.getPostBySlug({ slug }),
	});

	return !isLoading ? (
		<section className="flex flex-col justify-start items-center my-18 pb-30">
			<span className="flex justify-start mb-3 w-[38em]">
				<BackButton />
			</span>
			<div dangerouslySetInnerHTML={{ __html: data?.post?.body ?? "" }} className="typeset typeset-article max-w-[37em] relative" />
			<PostActionDropdown data={data} slug={slug} />
		</section>
	) : (
		<Loader />
	);
}

export default PostPage;
