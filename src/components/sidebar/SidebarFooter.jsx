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

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import databaseService from "@/appwrite/databaseService";
import authService from "@/appwrite/authService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { logout } from "@/store/userSlice";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { Response } from "@/lib/response";

export default function SidebarFooterWrapper() {
  const userData = useSelector((state) => state.auth?.userData);
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const isUserLoggedOut = await authService.logout();
    if (!isUserLoggedOut) return new Response(false, "Failed to logout user");
    dispatch(logout());
    setTimeout(() => navigate("/signin"), 500);
    return new Response(true, "User logged out successfully");
  };
  const toastHandler = () => {
    const toastPromise = new Promise((resolve,reject) => {
      logoutHandler().then(({isSuccess,message}) => {
        if(isSuccess) resolve(message)
        else reject(message)
      })
    })

    toast.promise(toastPromise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout user",
      richColors:true
    })
  }
  const defaultUser = useMemo(
    () => ({
      name: "John Doe",
      email: "johndoe.com",
      avatar: databaseService.getUserAvatar("John Doe"),
    }),
    []
  );
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    if (userData)
      setUser({
        name: userData.name || defaultUser.name,
        email: userData.email || defaultUser.email,
        avatar: databaseService.getUserAvatar(
          userData.name || defaultUser.name
        ),
      });
    else setUser(defaultUser);
  }, [userData, defaultUser]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={!userData}>
            <SidebarMenuButton
              size="lg"
              className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground`}
            >
              <Avatar className="h-8 w-8 rounded-full">
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
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
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
          <Toaster richColors theme="light"/>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
