import { SidebarContent } from "./sidebarContent";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";

interface SideBarProps {
  data?: any[];
}

const SideBar: React.FC<SideBarProps> = ({ data }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={` text-black shadow-lg transition-all duration-300  rounded-r-2xl
        } hidden md:block`}
      >
        <SidebarContent />
      </div>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-blue-600">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBar;
