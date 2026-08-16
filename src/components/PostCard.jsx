import { useNavigate } from "react-router-dom";
import { getDefaultAvatarUrl } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PostCard({ author, coverImage, title, url }) {
	const navigate = useNavigate();

	return (

		<Card className="relative w-full max-w-sm mx-auto overflow-hidden pt-0 cursor-pointer flex justify-between" onClick={() => navigate(url)}>

			{coverImage ? (
				<img src={coverImage} alt="coverimage" className="rounded-md" />
			) : (
				<>
					<div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
					<img
						src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Photo by mymind on Unsplash"
						title="Photo by mymind on Unsplash"
						className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale" />
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
						<AvatarImage src={author?.avatarUrl ?? getDefaultAvatarUrl("John Doe")} alt={author?.fullName ?? "John Doe"} />
						<AvatarFallback className="">JD</AvatarFallback>
					</Avatar>
					<p>{author?.fullName ?? "John Doe"}</p>
				</div>
			</CardFooter>
		</Card>
	);
}

export default PostCard;
