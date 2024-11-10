"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "@/app/context";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface HeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user } = useUserContext();

  const renderAddButton = () => {
    if (user?.role === "ADMIN") {
      // Dropdown Menu for Admin
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full bg-tangerine hover:bg-salmon text-chiffon flex items-center cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-2">
            <DropdownMenuLabel className="text-sacramento font-medium">
              Add Options
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/adddoctor"
                className="hover:bg-salmon hover:text-chiffon rounded-md cursor-pointer block p-2"
              >
                Add New Doctor
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/addpatient"
                className="hover:bg-salmon hover:text-chiffon rounded-md cursor-pointer block p-2"
              >
                Add New Patient
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/addadmin"
                className="hover:bg-salmon hover:text-chiffon rounded-md cursor-pointer block p-2"
              >
                Add New Admin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/addappointment"
                className="hover:bg-salmon hover:text-chiffon rounded-md cursor-pointer block p-2"
              >
                Add New Appointment
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else if (user?.role === "PATIENT") {
      // Button for Patients
      return (
        <Link href="/book">
          <Button className="rounded-full bg-tangerine hover:bg-salmon text-chiffon flex items-center cursor-pointer">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Appointment
          </Button>
        </Link>
      );
    } else {
      // Do not render the button for Doctors
      return null;
    }
  };

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
        {renderAddButton()}
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
