import { Loader, PostCard } from "../components";

export default function PostList({ isLoading, files, className = "" }) {
	return isLoading ? (
		<Loader />
	) : (
		<div
			className={`grid gap-6 mx-6 pb-20 md:grid-cols-3 lg:max-w-5xl lg:grid-cols-3 xl:mx-auto ${className}`}
		>
			{files?.map((file) => {
				const { slug, title, _id, author } = file;
				return (
					<PostCard
						key={_id}
						url={`/posts/${slug}`}
						href={file.coverImageUrl}
						title={title}
						authorId={author}
					/>
				);
			})}
		</div>
	);
}
