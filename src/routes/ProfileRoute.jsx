import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/components";
import { Profile } from "@/pages";

export default function ProfileRoute() {
	const userId = useSelector((state) => state.user.userData);
	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to={`/profile/${userId}`} replace />}
			/>
			<Route
				path="/:userId"
				element={
					<AuthLayout authentication={false}>
						<Profile />
					</AuthLayout>
				}
			/>
		</Routes>
	);
}
