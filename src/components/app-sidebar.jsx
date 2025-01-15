import { Home, SquarePen, Search, Settings, FolderLock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
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
  return (
    <Sidebar
      collapsible="icon"
    >
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
                    <Link to={item.url}>
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
