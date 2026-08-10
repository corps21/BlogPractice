import axios from "axios";

const api = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		console.log(config);
		return config;
	},
	(_err) => {},
	{
		synchronous: true,
		runWhen: () => {
			return false;
		},
	},
);

export default api;
