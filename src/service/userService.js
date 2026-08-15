import api from "@/api/api";
import { axiosWrapper } from "@/lib/utils";

export class UserService {
	registerUser = axiosWrapper(
		async ({ fullName, email, userName, password }) => {
			return api.post("/user/register", {
				fullName,
				email,
				userName,
				password,
			});
		},
	);

	registerAnonUser = axiosWrapper(async () => {
		return api.post('/user/sessions');
	})

	loginUser = axiosWrapper(async ({ email, userName, password }) => {
		return api.post("/user/login", { email, password, userName });
	});

	getCurrentUser = axiosWrapper(async () => {
		return api.get("/user/me");
	});

	logoutUser = axiosWrapper(async () => {
		return api.post("/user/logout");
	});

	refreshAccessToken = axiosWrapper(async () => {
		return api.post("/user/refresh-token");
	});

	changeUserPassword = axiosWrapper(async ({ oldPassword, newPassword }) => {
		return api.post("/user/password", { oldPassword, newPassword });
	});

	updateUserDetails = axiosWrapper(async ({ email, fullName }) => {
		return api.put("/me", { email, fullName });
	});

	updateAvatar = axiosWrapper(async ({ avatar }) => {
		const formData = new FormData();
		formData.append("avatar", avatar);

		return api.patch("/user/avatar", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	});

	getUserFromId = axiosWrapper(async (userId) => {
		return api.get(`/user/${userId}`);
	});
}

export const userService = new UserService();
