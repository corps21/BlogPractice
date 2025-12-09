import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { toastPromiseWrapper } from "@/lib/utils";
import databaseService from "@/microService/databaseService";
import { userService } from "@/microService/userService";
import { removeAccessToken } from "@/store/authSlice";
import { logout } from "@/store/userSlice";
import { Button } from "../ui/button";

export default function SidebarFooterWrapper() {
	const userData = useSelector((state) => state.user.userData);
	const { isMobile, setOpenMobile, setOpen } = useSidebar();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toastHandler = () => {
		if (isMobile) setOpenMobile(false);
		setOpen(false);
		toastPromiseWrapper(logOutUser, toastOptions);
	};

	const toastOptions = {
		loading: "Logging out of the account",
		success: `Successfully logged out of the account`,
		error: (err) => `Something went wrong ( ${err} )`,
		richColors: true,
	};

	const logOutUser = async (resolve, reject) => {
		const result = await userService.logoutUser();
		if (result.success) {
			resolve();
		} else {
			reject(result.message);
		}
		dispatch(logout());
		dispatch(removeAccessToken());
		navigate("/login");
	};

	const defaultUser = useMemo(
		() => ({
			name: "John Doe",
			email: "johndoe.com",
			avatar: databaseService.getUserAvatar("John Doe"),
		}),
		[],
	);
	const [user, setUser] = useState(defaultUser);

	// TODO: IMPROVE THIS
	useEffect(() => {
		if (userData)
			setUser({
				name: userData.fullName || defaultUser.name,
				email: userData.email || defaultUser.email,
				avatar: databaseService.getUserAvatar(
					userData.fullName || defaultUser.name,
				),
			});
		else setUser(defaultUser);
	}, [userData]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild disabled={!userData}>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className={`p-0 font-normal`}>
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-full">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link to={`/profile/${userData?._id}`}>
								<DropdownMenuItem className="cursor-pointer">
									<BadgeCheck />
									Account
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem className="cursor-pointer">
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Button
								variant="ghost"
								className="h-6 cursor-pointer"
								onClick={toastHandler}
							>
								<LogOut />
								Log out
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
