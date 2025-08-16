import { fetchWrapper } from "@/lib/utils";

const postOptions = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
};

export class UserService {
	registerUser = fetchWrapper(
		async ({ fullName, email, userName, password }) => {
			const options = {
				...postOptions,
				body: JSON.stringify({ fullName, email, userName, password }),
			};
			const result = await fetch(`/user/register`, options);
			return await result.json();
		},
	);

	loginUser = fetchWrapper(async ({ email, userName, password }) => {
		const options = {
			...postOptions,
			credentials: "include",
			body: JSON.stringify({ email, password, userName }),
		};
		const result = await fetch(`/user/login`, options);
		return await result.json();
	});

	getCurrentUser = fetchWrapper(async () => {
		const result = await fetch("/user/me");
		return await result.json();
	});

	logoutUser = fetchWrapper(async () => {
		const result = await fetch("/user/logout", { ...postOptions });
		return await result.json();
	});
}

export const userService = new UserService();
