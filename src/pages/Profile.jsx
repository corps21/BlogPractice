import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/service/userService";
import { PostList } from "@/components";
import { getDefaultAvatarUrl } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
	const userIdFromStore = useSelector((state) => state.user.data?._id);
	const { userId: userIdFromUrl } = useParams();

	const { data: profileUserData } = useQuery({
		queryKey: ["profile", userIdFromUrl],
		queryFn: () => userService.getUserFromId(userIdFromUrl),
	})

	const profileUser = profileUserData?.data?.user

	const { data: postData } = useQuery({
		queryKey: ["posts", "profile", userIdFromUrl],
		queryFn: () => {
			if (profileUser?._id === userIdFromStore) {
				return userService.getAllCurrentUserPosts()
			} else {
				return userService.getUserPublicPosts({userId: userIdFromUrl})
			}
		},
	})

	const posts = postData?.data?.posts

	return (
		<>
			<section className="max-w-4xl mx-auto px-6 mt-16">
				<div className="flex gap-4 items-center">
					<Avatar className="size-20 ">
						<AvatarImage src={profileUser?.avatarUrl ?? getDefaultAvatarUrl(profileUser?.fullName ?? "John Doe")} alt={profileUser?.fullName ?? "John Doe"} />
						<AvatarFallback className="">JD</AvatarFallback>
					</Avatar>

					<div>
						<h1 className="text-2xl font-bold">{profileUser?.fullName ?? "John Doe"}</h1>
						<p>{profileUser?.userName}</p>
					</div>
				</div>

				<Separator className="mt-6 mb-10" />

			</section>
			<PostList isLoading={false} files={posts} className="mt-6 pb-20" />
		</>
	);
}
