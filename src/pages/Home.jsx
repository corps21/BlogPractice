import { useSelector } from "react-redux";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";
import { CTA, PostList } from "../components";

function Home() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const { isLoading, data } = useToastQuery({
		enabled: isLoggedIn,
		queryKey: ["posts", "public"],
		queryFn: () => postService.getPublicPosts(),
	});

	return isLoggedIn ? (
			<PostList isLoading={isLoading} files={data?.posts} className="mt-6" />
	) : (
		<CTA />
	);
}

export default Home;
