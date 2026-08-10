import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/api";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import { Separator } from "@/components/ui/separator";

import { Toaster } from "@/components/ui/sonner";
import { userService } from "@/service/userService";
import { addAccessToken } from "@/store/authSlice";
import { logout, setCurrentUser } from "@/store/userSlice";
import { ModeToggle } from ".";
import {Navbar} from "./Navbar";

export default function Layout({ children }) {
	const status = useSelector((state) => state.user.isLoggedIn);
	const accessToken = useSelector((state) => state.auth.accessToken);

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
					}
				} else {
					return Promise.reject(err);
				}
			},
		);

		return () => api.interceptors.response.eject(interceptor);
	}, [dispatch]);

	return (
		<main className="">
		<Navbar />
		{children}
		<Toaster richColors />
		</main>
		// <SidebarProvider defaultOpen={false}>
		// 	{/* <AppSidebar /> */}
		// 	<SidebarInset>
		// 		{/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
		// 			<div className="flex justify-between w-5/6 lg:w-3/6 mx-auto">
		// 				<div className="flex items-center">
		// 					<SidebarTrigger className="-ml-1" />
		// 					<Separator orientation="vertical" className="mr-2 h-4" />
		// 					<BreadcrumbsWrapper />
		// 				</div>
		// 				<ModeToggle />
		// 			</div>
		// 		</header> */}
		// 		<div className="flex flex-1 flex-col gap-4">{children}</div>
		// 	</SidebarInset>
		// </SidebarProvider>
	);
}
