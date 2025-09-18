import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Loader, PostForm } from "../components";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/microservice/postService";
import { Toaster, toast } from "sonner";

function EditPost() {
	const { slug } = useParams();

	const {data, isLoading, isError, error} = useQuery({
		queryKey: ["post",slug],
		queryFn: () => postService.getPostBySlug({slug})
	})

	useEffect(() => {
		if(isError) {
			toast.error(`Something went wrong ${error.message}`)
		}
	},[isError, error])

	return !isLoading ? (
		<Container className="my-auto">
			<Header pageTitle="Edit Post" />
			<PostForm post={data?.data?.post} />
			<Toaster />
		</Container>
	) : (
		<Loader />
	);
}

export default EditPost;
