import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/api";

import { Toaster } from "@/components/ui/sonner";
import { userService } from "@/service/userService";
import { addAccessToken } from "@/store/authSlice";
import { setCurrentUser } from "@/store/userSlice";
import {Navbar} from "./Navbar";

import {useLogout} from "@/hooks/useLogout";

export default function Layout({ children }) {
	const accessToken = useSelector((state) => state.auth?.accessToken);
	const logout = useLogout();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCurrentUser());
	}, [dispatch]);

	useLayoutEffect(() => {
		const interceptor = api.interceptors.request.use((config) => {
			config.headers.Authorization =
				accessToken && !config?._newToken
					? `Bearer ${accessToken}`
					: config.headers.Authorization;
			return config;
		});

		return () => api.interceptors.request.eject(interceptor);
	}, [accessToken]);

	useLayoutEffect(() => {
		const interceptor = api.interceptors.response.use(
			(response) => response,
			async (err) => {
				const originalReq = err.config;

				if (
					err.response.status === 401 &&
					(err.response.data.message === "jwt expired" ||
						err.response.data.message === "Need token for this request")
				) {
					try {
						const response = await userService.refreshAccessToken();
						dispatch(addAccessToken(response.data.accessToken));
						originalReq.headers.Authorization = `Bearer ${response.data.accessToken}`;
						originalReq._newToken = true;
						return api(originalReq);
					} catch {
						logout();
					}
				} else {
					return Promise.reject(err);
				}
			},
		);

		return () => api.interceptors.response.eject(interceptor);
	}, [dispatch, logout]);

	return (
		<>
		<Navbar />
		{children}
		<Toaster richColors />
		</>
	);
}
