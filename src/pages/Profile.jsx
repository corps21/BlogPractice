import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// TODO: fix breadcrumbs for profile page
export default function Profile() {
	const userIdFromStore = useSelector((state) => state.user.data?._id);
	const { userId: userIdFromUrl } = useParams();

	return (
		<div className="text-white">
			Profile
			{userIdFromStore === userIdFromUrl ? "Change Pass" : null}
		</div>
	);
}
