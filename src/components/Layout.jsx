/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSidebar } from "@/components/app-sidebar";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from ".";
import { setCurrentUser } from "@/store/userSlice";

export default function Layout({ children }) {
	const status = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!status) {
			dispatch(setCurrentUser())
		}
	},[])

	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex justify-between w-5/6 lg:w-3/6 mx-auto">
						<div className="flex items-center">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<BreadcrumbsWrapper />
						</div>
						<ModeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
