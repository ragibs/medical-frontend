"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "@/app/context";

interface HeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user } = useUserContext();

  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-sacramento">
          {`Welcome back, ${user?.role === "DOCTOR" ? `Dr. ` : ""} ${
            user?.first_name
          } ${user?.last_name}`}
        </h1>
        <p className="text-sm text-pine mt-1">Saturday, October 12</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button className="rounded-full bg-tangerine hover:bg-salmon text-chiffon">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
        <Button
          className="lg:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
