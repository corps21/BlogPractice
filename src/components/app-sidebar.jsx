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
  useSidebar,
} from "@/components/ui/sidebar";

import BrandIcon from "./BrandIcon";
import { useEffect, useState } from "react";
import useDebounce  from "@/hooks/use-debounce";

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
  const { setOpen } = useSidebar();
  const [mouseHovering, setMouseHovering] = useState(false);
  const debouncedMouseHovering = useDebounce(mouseHovering,250);

  useEffect(() => {
    if (!debouncedMouseHovering) {
      setOpen(false);
    }
    else {
      setOpen(true);
    }    
  })

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => {
        setMouseHovering(true);
      }}
      onMouseLeave={() => {
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
