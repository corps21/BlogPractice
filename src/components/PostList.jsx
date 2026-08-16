import { PostCard } from "../components";
import { PostListSkeleton } from "./skeletons/PostList";

export default function PostList({ isLoading, files, className = "" }) {
	return isLoading ? (
		<PostListSkeleton count={12} />
	) : (
		<div
			className={`max-w-4xl mx-auto grid gap-8 px-6 md:grid-cols-3 ${className}`}
		>
			{files?.map((file) => {
				const { slug, title, _id, author, coverImage } = file;
				return (
					<PostCard
						key={_id}
						url={`/posts/${slug}`}
						coverImage={coverImage}
						title={title}
						author={author}
					/>
				);
			})}
		</div>
	);
}
