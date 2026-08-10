import { SquarePenIcon } from "lucide-react";
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
			<div className="flex justify-start w-full mb-6">
				<Button variant="icon" className="pl-0" asChild>
					<Link to="/posts/create" className="dark:text-white ">
						<SquarePenIcon className="dark:stroke-white" />
						Create
					</Link>
				</Button>
			</div>
			<PostList isLoading={isLoading} files={data?.posts} />
		</>
	);
}

export default Archive;
