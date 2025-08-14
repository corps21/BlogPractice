import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { useNavigate } from "react-router-dom";
import BrandIcon from "../BrandIcon";

export default function SidebarHeaderWrapper() {
  const navigate = useNavigate()
  const {setOpenMobile} = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            setOpenMobile(false)
            navigate("/")
          }}
          size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="ml-[2px] bg-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg">
            <BrandIcon />
          </div>
          <span className="text-base font-medium">BlogSphere</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
