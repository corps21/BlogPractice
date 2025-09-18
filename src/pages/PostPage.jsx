import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Button, Container, Loader } from "../components";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/microservice/postService";

function PostPage() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.userData?.$id);

	const {isLoading, data} = useQuery({
		queryKey: ["posts", slug],
		queryFn: () => postService.getPostBySlug({ slug })
	})
	// TODO: fix data 
	return !isLoading ? (
		<Container>
			<div>
				<div className="my-[6rem]">
					<figure>
						<img src={""} alt="" className="aspect-auto" />
					</figure>
				</div>
				<div className="mb-[12rem]">
					<div className="text-4xl text-center">
						{data?.data?.post?.title} <br />
					</div>
					<div className="text-center text-2xl text-[#999]">
						By {data?.data?.post?.author}
					</div>
					<div className="text-2xl border-2 bg-gray-200 rounded-lg border-black min-h-[16rem] my-[5rem] p-[1rem]">
						{parse(data?.data?.post?.body)}
					</div>

					{userId === data?.data?.post?.author && (
						<div className="flex justify-between mb-[2rem]">
							<Button
								className="w-[48%] bg-green-600 hover:text-green-600"
								text="Edit"
								onClick={() => navigate(`/all-post/edit-post/${slug}`)}
							/>
							<Button
								className=" w-[48%] bg-red-600 hover:text-red-600"
								text="Delete"
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
