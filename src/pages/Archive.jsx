import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";
import { PostList } from "../components";

function Archive() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const { isLoading, data } = useToastQuery({
		enabled: isLoggedIn,
		queryKey: ["posts", "archive"],
		queryFn: () => postService.getAllPosts(),
	});

	return (
		<>
			<PostList isLoading={isLoading} files={data?.posts} />
		</>
	);
}

export default Archive;
