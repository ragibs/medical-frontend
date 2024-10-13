"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, Menu } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-sacramento">
          Welcome back, Dr. Jane Doe
        </h1>
        <p className="text-sm text-pine mt-1">Saturday, October 12</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button className="rounded-full bg-tangerine hover:bg-salmon text-chiffon">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
        <Button variant="ghost" className="text-sacramento hover:text-pine">
          <Bell className="h-5 w-5" />
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
