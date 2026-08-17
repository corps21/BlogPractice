import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { postService } from "@/service/postService";
import { Loader, PostForm } from "../components";

function EditPost() {
	const { slug } = useParams();
	const location = useLocation();
	const isPrivate = location.pathname.split("/").findIndex(item => item === "private") >= 0;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["post", slug],
		queryFn: () => {
			if(isPrivate) return postService.getPrivatePostBySlug({ slug })
			else return postService.getPostBySlug({ slug })
		},
	});

	useEffect(() => {
		if (isError) {
			toast.error(`${error.message}`);
		}
	}, [isError, error]);

	return !isLoading ? (
		<>
			<PostForm post={data?.data?.post} />
		</>
	) : (
		<Loader />
	);
}

export default EditPost;
