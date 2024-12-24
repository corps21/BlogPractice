import { Calendar, Home, SquarePen, Search, Settings, FolderLock } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";

import BrandIcon from "./BrandIcon";
import { useEffect, useState } from "react";

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
  const { open, setOpen } = useSidebar();
  const [mouseHovering, setMouseHovering] = useState(false);

  useEffect(() => {
    if (open && !mouseHovering) {
      let timeout = setTimeout(() => {
        setOpen(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [open, setOpen, mouseHovering]);

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => {
        setOpen(true);
        setMouseHovering(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
        setMouseHovering(false);
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <BrandIcon />
                <span>BlogSphere</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
    </Sidebar>
  );
}
