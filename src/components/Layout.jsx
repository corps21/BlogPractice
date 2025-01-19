/* eslint-disable react/prop-types */
import { SidebarProvider, SidebarInset, SidebarTrigger, } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { login } from "../store/userSlice";
import { Separator } from "@/components/ui/separator"
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
export default function Layout({ children }) {
  const status = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!status) {
      authService.getCurrentUser()
        .then((data) => {
          if (data) {
            dispatch(login({ userData: data }));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, status]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbsWrapper />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
