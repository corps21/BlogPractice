/* eslint-disable react/prop-types */
import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { login, updateCheckStatus } from "../store/userSlice";

export default function Layout({ children }) {
  const status = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!status) {
      authService
        .getCurrentUser()
        .then((data) => {
          if (data) {
            dispatch(login({ userData: data }));
          }
          dispatch(updateCheckStatus(true));
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, status]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex my-4">
        <div className="w-full flex flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
}
