/* eslint-disable react/prop-types */
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

function Header({pageTitle="Home"}) {
  const { toggleSidebar } = useSidebar();


  return (
    <header className="flex flex-col w-full mb-6 gap-3">
      <BreadcrumbsWrapper />
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
        <Button
          variant="ghost"
          className="w-7 h-7 md:hidden"
          onClick={toggleSidebar}
        >
          <MenuIcon strokeWidth={3} />
        </Button>
      </div>
    </header>
  );
}

export default Header;
