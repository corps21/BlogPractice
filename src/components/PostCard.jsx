import { useNavigate } from "react-router-dom";
import useToastQuery from "@/hooks/useToastQuery";
import { getDefaultAvatarUrl } from "@/lib/utils";
import { userService } from "@/service/userService";
import { AvatarCard } from ".";

function PostCard({ href, title, authorId, url }) {
	const navigate = useNavigate();

	const { data } = useToastQuery({
		queryKey: ["user", authorId],
		queryFn: () => userService.getUserFromId(authorId),
	});

	return (
		<article className="relative hover:cursor-pointer">
			<figure
				className="aspect-square min-w-[14rem] md:max-w-[18rem]"
				onClick={() => navigate(url)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						navigate(url);
					}
				}}
			>
				<img src={href} alt="coverimage" className="rounded-md" />
			</figure>
			<div className="absolute text-white bg-[#1d1d1d34] bottom-0 backdrop-blur-sm p-2 w-full md:max-w-[18rem] rounded-b-sm">
				<h2 className="text-xl font-medium">{title}</h2>
				<AvatarCard
					avatarName={data?.user?.fullName ?? "John Doe"}
					avatarImageHref={getDefaultAvatarUrl(
						data?.user?.fullName ?? "John Doe",
					)}
				/>
			</div>
		</article>
	);
}

export default PostCard;
