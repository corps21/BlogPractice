import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { Link } from "react-router-dom";
import BrandIcon from "../BrandIcon";

export default function SidebarHeaderWrapper() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link to="/" className="flex items-center">
            <div className="">
              <BrandIcon />
            </div>
            <span className="text-lg font-medium">BlogSphere</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
