import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { postService } from "@/service/postService";
import { Container, Header, Loader, PostForm } from "../components";

function EditPost() {
	const { slug } = useParams();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["post", slug],
		queryFn: () => postService.getPostBySlug({ slug }),
	});

	useEffect(() => {
		if (isError) {
			toast.error(`${error.message}`);
		}
	}, [isError, error]);

	return !isLoading ? (
		// <Container className="my-auto">
		// 	<Header pageTitle="Edit Post" />
		// </Container>
		<>
		<PostForm post={data?.data?.post} />
		</>
	) : (
		<Loader />
	);
}

export default EditPost;
