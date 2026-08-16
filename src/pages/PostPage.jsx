import { useParams } from "react-router-dom";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";
import { Loader } from "../components";
import { PostActionDropdown } from "../components/PostActionDropdown";
import { BackButton } from "@/components/BackButton";
import { useQuery } from "@tanstack/react-query";
import { PostRecommendation } from "../components/PostRecommendation";

function PostPage() {
	const { slug } = useParams();

	const { isLoading, data } = useToastQuery({
		queryKey: ["post", slug],
		queryFn: () => postService.getPostBySlug({ slug }),
	});

	const { isLoading: recommendationsIsLoading, data: recommendations } = useQuery({
		queryKey: ["recommendations", slug],
		queryFn: () => postService.getRecommendations({ slug }),
	})

	return !isLoading ? (
		<section className="mt-8">
			<span className="flex justify-between mb-3 max-w-[37em] mx-auto px-4 md:px-4 lg:px-1">
				<BackButton />
				<PostActionDropdown data={data} slug={slug} />
			</span>
			<article dangerouslySetInnerHTML={{ __html: data?.post?.body ?? "" }} className="typeset typeset-article max-w-[37em] mx-auto px-6 lg:px-8" />
			<PostRecommendation isLoading={recommendationsIsLoading} data={recommendations?.data?.recommendations} />
		</section>
	) : (
		<Loader />
	);
}

export default PostPage;
