import { PostCard } from "../components";
import { PostListSkeleton } from "./skeletons/PostList";

export default function PostList({ isLoading, files, className = "" }) {
	console.log(files)
	return isLoading ? (
		<PostListSkeleton count={12} />
	) : (
		<div
			className={`max-w-4xl mx-auto grid gap-8 px-6 md:grid-cols-3 ${className}`}
		>
			{files?.map((file) => {
				return (
					<PostCard
						key={file?._id}
						post={file}
					/>
				);
			})}
		</div>
	);
}
