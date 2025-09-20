import { SquarePenIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/microservice/postService";
import { Container, Header, PostList } from "../components";

function AllPosts() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const { isLoading, data } = useToastQuery({
		enabled: isLoggedIn,
		queryKey: ["posts", "all"],
		queryFn: () => postService.getAllPosts(),
	});

	return (
		<Container className="flex flex-col items-center">
			<Header pageTitle="All Posts" />
			<div className="flex justify-start w-full mb-6">
				<Button variant="icon" className="pl-0" asChild>
					<Link to="/add-post" className="dark:text-white ">
						<SquarePenIcon className="dark:stroke-white" />
						Create
					</Link>
				</Button>
			</div>
			<PostList isLoading={isLoading} files={data?.posts} />
			<Toaster />
		</Container>
	);
}

export default AllPosts;
