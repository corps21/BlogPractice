import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { postService } from "@/microservice/postService";
import { Button, Container, Loader } from "../components";
import useToastMutation from "@/hooks/useToastMutation";
import useToastQuery from "@/hooks/useToastQuery";

function PostPage() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.user.userData?._id);

	const { isLoading, data } = useToastQuery({
		queryKey: ["post", slug],
		queryFn: () => postService.getPostBySlug({ slug }),
	});

	const deleteMutate = useToastMutation({
		loadingText: "Deleting the post",
		successText: "Successfully deleted the post"
	}, {
		mutationKey: ["post", "delete"],
		mutationFn: async () => {
			await postService.deletePost({slug})
		},
		onSuccess: () => {
			navigate("/")
		}
	})

	return !isLoading ? (
		<Container>
			<div>
				<div className="my-[6rem]">
					<figure>
						<img
							src={data?.post?.coverImageUrl}
							alt=""
							className="aspect-auto"
						/>
					</figure>
				</div>
				<div className="mb-[12rem]">
					<div className="text-4xl text-center">
						{data?.post?.title} <br />
					</div>
					<div className="text-center text-2xl text-[#999]">
						By {data?.post?.author}
					</div>
					<div className="text-2xl border-2 bg-gray-200 rounded-lg border-black min-h-[16rem] my-[5rem] p-[1rem]">
						{parse(data?.post?.body ?? "")}
					</div>

					{userId === data?.post?.author && (
						<div className="flex justify-between mb-[2rem]">
							<Button
								className="w-[48%] bg-green-600 hover:text-green-600"
								text="Edit"
								onClick={() => navigate(`/edit-post/${slug}`)}
							/>
							<Button
								className=" w-[48%] bg-red-600 hover:text-red-600"
								text="Delete"
								onClick={deleteMutate.mutate}
							/>
						</div>
					)}
				</div>
			</div>
			<Toaster richColors theme="light" />
		</Container>
	) : (
		<Loader />
	);
}

export default PostPage;
