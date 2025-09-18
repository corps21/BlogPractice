import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { postService } from "@/microservice/postService";
import { Container, CTA, Header, PostList } from "../components";

function Home() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const { isLoading, data } = useQuery({
		enabled: isLoggedIn,
		queryKey: ["posts", "public"],
		queryFn: () => postService.getPublicPosts(),
	});

	return isLoggedIn ? (
		<Container className="flex flex-col items-center">
			<Header />
			<PostList
				isLoading={isLoading}
				files={data?.data?.posts}
				className="mt-6"
			/>
		</Container>
	) : (
		<CTA />
	);
}

export default Home;
