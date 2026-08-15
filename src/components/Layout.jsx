import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/api";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import { Separator } from "@/components/ui/separator";

import { Toaster } from "@/components/ui/sonner";
import { userService } from "@/service/userService";
import { addAccessToken, removeAccessToken } from "@/store/authSlice";
import { logout, setCurrentUser } from "@/store/userSlice";
import { ModeToggle } from ".";
import {Navbar} from "./Navbar";

export default function Layout({ children }) {
	const status = useSelector((state) => state.user?.isLoggedIn);
	const accessToken = useSelector((state) => state.auth?.accessToken);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!status) {
			dispatch(setCurrentUser());
		}
	}, [dispatch, status]);

	// TODO: generalize the axios instance with userService

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
						dispatch(logout());
						dispatch(removeAccessToken());
					}
				} else {
					return Promise.reject(err);
				}
			},
		);

		return () => api.interceptors.response.eject(interceptor);
	}, [dispatch]);

	return (
		<main>
		<Navbar />
		{children}
		<Toaster richColors />
		</main>
	);
}
