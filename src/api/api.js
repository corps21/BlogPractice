import axios from "axios";

const api = axios.create({
	baseURL: "/api/v1",
	withCredentials: true,
});

// api.interceptors.request.use(
// 	(config) => {
// 		return config;
// 	},
// 	(_err) => {},
// 	{
// 		synchronous: true,
// 		runWhen: () => {
// 			return false;
// 		},
// 	},
// );

export default api;
