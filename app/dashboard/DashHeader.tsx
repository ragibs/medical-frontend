"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "@/app/context";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user } = useUserContext();

  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        {user ? (
          <>
            <h1 className="text-3xl font-bold text-sacramento">
              {`Welcome back, ${user.role === "DOCTOR" ? `Dr. ` : ""}${
                user.first_name
              } ${user.last_name}`}
            </h1>
            {/* DashBoard Date */}
            <p className="text-sm text-pine mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>{" "}
          </>
        ) : (
          <>
            <Skeleton className="w-[200px] h-[32px] rounded-full mb-2 bg-salmon" />
            <Skeleton className="w-[150px] h-[20px] rounded-full bg-salmon" />
          </>
        )}
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
