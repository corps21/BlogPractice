import { Loader, PostCard } from "../components";

export default function PostList({ isLoading, files, className = "" }) {
	return isLoading ? (
		<Loader />
	) : (
		<div
			className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full ${className}`}
		>
			{files?.map((file) => {
				const { slug, title, _id, author } = file;
				return (
					<PostCard
						key={_id}
						url={`/posts/${slug}`}
						href={file.coverImageUrl ?? ""}
						title={title}
						authorId={author}
					/>
				);
			})}
		</div>
	);
}
