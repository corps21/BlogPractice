import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/service/userService";
import { PostList } from "@/components";
import { getDefaultAvatarUrl } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import { useState, useEffect} from "react";

export default function Profile() {
	const userIdFromStore = useSelector((state) => state.user.data?._id);
	const [isLoading, setIsLoading] = useState(true);
	const [postData, setPostData] = useState([]);
	const { userId: userIdFromUrl } = useParams();

	const { data: profileUserData } = useQuery({
		queryKey: ["profile", userIdFromUrl],
		queryFn: async () => {
			return (await userService.getUserFromId(userIdFromUrl))?.data?.user
		},
	})

	useEffect(() => {
		(async () => {
			setIsLoading(true)
			if (!profileUserData) return []
			if (profileUserData?._id === userIdFromStore) {
				const result = (await userService.getAllCurrentUserPosts())?.data?.posts
				setPostData(result)
			} else {
				const result = (await userService.getUserPublicPosts({ userId: userIdFromUrl }))?.data?.posts
				setPostData(result)
			}
			setIsLoading(false);
		})()
	}, [profileUserData, userIdFromStore, userIdFromUrl])

	console.log(postData)

	return (
		<>
			<section className="max-w-4xl mx-auto px-6 mt-16">
				<div className="flex gap-4 items-center">
					<Avatar className="size-20 ">
						<AvatarImage src={profileUserData?.avatarUrl ?? getDefaultAvatarUrl(profileUserData?.fullName ?? "John Doe")} alt={profileUserData?.fullName ?? "John Doe"} />
						<AvatarFallback className="">JD</AvatarFallback>
					</Avatar>

					<div>
						<h1 className="text-2xl font-bold">{profileUserData?.fullName ?? "John Doe"}</h1>
						<p>{profileUserData?.userName}</p>
					</div>
				</div>

				<Separator className="mt-6 mb-10" />

			</section>
			<PostList isLoading={isLoading} files={postData} className="mt-6 pb-20" />
		</>
	);
}
