import api from "@/api/api";
import { axiosWrapper } from "@/lib/utils";

const postOptions = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
};

export class UserService {

	registerUser = axiosWrapper(({fullName, email, userName, password}) => {
		return api.post('/user/register', {fullName, email, userName, password})
	})

	loginUser = axiosWrapper(({email, userName, password}) => {
		return api.post("/user/login", {email, password, userName})
	})

	getCurrentUser = axiosWrapper(() => {
		return api.get("/user/me")
	});

	logoutUser = axiosWrapper(() => {
		return api.post("/user/logout")
	});

	refreshAccessToken = axiosWrapper(() => {
		return api.post("/user/refresh-token")
	})
}



export const userService = new UserService();
