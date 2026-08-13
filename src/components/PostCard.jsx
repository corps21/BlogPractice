import { useNavigate } from "react-router-dom";
import useToastQuery from "@/hooks/useToastQuery";
import { getDefaultAvatarUrl } from "@/lib/utils";
import { userService } from "@/service/userService";

import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PostCard({ href, title, authorId, url }) {
	const navigate = useNavigate();

	const { data } = useToastQuery({
		queryKey: ["user", authorId],
		queryFn: () => userService.getUserFromId(authorId),
	});

	return (

		<Card className="relative w-full max-w-md overflow-hidden pt-0 cursor-pointer flex justify-between" onClick={() => navigate(url)}>

			{href ? (
				<img src={href} alt="coverimage" className="rounded-md" />
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
				<Avatar className="size-6">
					<AvatarImage src={data?.user?.avatarUrl ?? getDefaultAvatarUrl("John Doe")} alt={data?.user?.name ?? "John Doe"} />
					<AvatarFallback className="">JD</AvatarFallback>
				</Avatar>
				<p>{data?.user?.fullName ?? "John Doe"}</p>
			</CardFooter>
		</Card>
	);
}

export default PostCard;
