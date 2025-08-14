import { FolderLock, Home, Search, Settings, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import SidebarFooterWrapper from "./sidebar/SidebarFooter";
import SidebarHeaderWrapper from "./sidebar/SidebarHeader";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "All Posts",
		url: "/all-post",
		icon: FolderLock,
	},
	{
		title: "Create Post",
		url: "/all-post/add-post",
		icon: SquarePen,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: Settings,
	},
];

export function AppSidebar() {
	const { setOpenMobile } = useSidebar();
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarHeaderWrapper />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											to={item.url}
											onClick={() => {
												setOpenMobile(false);
											}}
										>
											<item.icon className="size-8" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarFooterWrapper />
			</SidebarFooter>
		</Sidebar>
	);
}
