import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";
import { Loader } from "../components";
import { Button } from "@/components/ui/button";
import {DeletePostModal} from "../components/DeletePostModal";

function PostPage() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.user.userData?._id);

	const { isLoading, data } = useToastQuery({
		queryKey: ["post", slug],
		queryFn: () => postService.getPostBySlug({ slug }),
	});

	return !isLoading ? (
		// <Container>
		// 	<div>
		// 		<div className="my-[6rem]">
		// 			<figure>
		// 				<img
		// 					src={data?.post?.coverImageUrl}
		// 					alt=""
		// 					className="aspect-auto"
		// 				/>
		// 			</figure>
		// 		</div>
		// 		<div className="mb-[12rem]">
		// 			{/* <div className="text-4xl text-center">
		// 				{data?.post?.title} <br />
		// 			</div>
		// 			<div className="text-center text-2xl text-[#999]">
		// 				By {data?.post?.author}
		// 			</div> */}
						
		// 		</div>
		// 	</div>
		// </Container>
		<section className="flex flex-col items-center my-18">
			<div dangerouslySetInnerHTML={{ __html: data?.post?.body ?? "" }} className="typeset typeset-article max-w-[37em]" />


			{userId === data.post.author && (
				<div className="flex justify-between mb-8">
					<Button
						variant="secondary"
						onClick={() => navigate(`/posts/${slug}/edit`)}
					>
						Edit
					</Button>
					<DeletePostModal />
				</div>
			)}
		</section>
	) : (
		<Loader />
	);
}

export default PostPage;
