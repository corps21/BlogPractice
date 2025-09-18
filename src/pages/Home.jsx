import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { postService } from "@/microservice/postService";
import { Container, CTA, Header, PostList } from "../components";
import { Toaster, toast} from "sonner";
import { useEffect } from "react";

function Home() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const { isLoading, data, isSuccess, isError, error } = useQuery({
		enabled: isLoggedIn,
		queryKey: ["posts", "public"],
		queryFn: () => postService.getPublicPosts(),
	});

	useEffect(() => {
		if(isError) {
			toast.error(`Something went wrong ${error.message}`)
		} else if(isSuccess) {
			toast.success("Succesfully fetched public posts")
		}
	},[isError,isSuccess, error])

	return isLoggedIn ? (
		<Container className="flex flex-col items-center">
			<Header />
			<PostList
				isLoading={isLoading}
				files={data?.data?.posts}
				className="mt-6"
			/>
			<Toaster />
		</Container>
	) : (
		<CTA />
	);
}

export default Home;
