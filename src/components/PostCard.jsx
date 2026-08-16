import { useNavigate } from "react-router-dom";
import { getDefaultAvatarUrl } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FALLBACK_COVER =
	"https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&fm=jpg&auto=format&fit=crop&w=1200&h=675";

function PostCard({ post }) {
	const navigate = useNavigate();
	const {author, title, slug, isPublic} = post;

	const imageSrc = post?.coverImage || FALLBACK_COVER;
	const avatarSrc = post?.author?.avatarUrl ?? getDefaultAvatarUrl("John Doe");

	const url = isPublic ? `/posts/${slug}` : `/posts/${slug}/private`;

	return (
		<Card className="relative w-full max-w-sm mx-auto overflow-hidden pt-0 cursor-pointer flex justify-between" onClick={() => navigate(url)}>
			{post?.coverImage ? (
				<img
					src={imageSrc}
					alt={title ?? "Post cover"}
					width={1200}
					height={675}
					loading="lazy"
					decoding="async"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="aspect-video w-full rounded-md object-cover"
				/>
			) : (
				<>
					<div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
					<img
						src={imageSrc}
						alt="Photo by mymind on Unsplash"
						title="Photo by mymind on Unsplash"
						width={1200}
						height={675}
						loading="lazy"
						decoding="async"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
					/>
				</>
			)}

			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardFooter className="gap-1">
				<div className="flex gap-1 items-center" onClick={(e) => {
					e.stopPropagation();
					navigate(`/profile/${author?._id}`)
				}}>
					<Avatar className="size-6">
						<AvatarImage src={avatarSrc} alt={author?.fullName ?? "John Doe"} />
						<AvatarFallback className="">JD</AvatarFallback>
					</Avatar>
					<p>{author?.fullName ?? "John Doe"}</p>
				</div>
			</CardFooter>
		</Card>
	);
}

export default PostCard;
