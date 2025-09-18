import { SquarePenIcon } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container, Header, PostList } from "../components";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/microservice/postService";
import { Toaster, toast } from "sonner";

function AllPosts() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const {isLoading, isSuccess, isError, error, data} = useQuery({
		enabled: isLoggedIn,
		queryKey: ["posts", "all"],
		queryFn: () => postService.getAllPosts()
	})

	useEffect(() => {
		if(isError) {
			toast.error(`Something went wrong ${error.message}`)
		} else if(isSuccess) {
			toast.success("Succesfully fetched public posts")
		}
	},[isError,isSuccess, error])

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
			<PostList isLoading={isLoading} files={data?.data?.posts} />
			<Toaster />
		</Container>
	);
}

export default AllPosts;
