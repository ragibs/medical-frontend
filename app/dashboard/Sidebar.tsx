import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/public/images/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  User,
  Users,
  BarChart2,
  BotMessageSquare,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/auth";
import { useUserContext } from "@/app/context";
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
}) => {
  const { logout } = useAuth();
  const { user } = useUserContext();

  const tabs =
    user?.role === "ADMIN"
      ? ["dashboard", "appointments", "patients", "doctors", "ai-assistant"]
      : ["appointments", "ai-assistant"];

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-sacramento to-pine text-chiffon shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Image
            src={logo}
            width={60}
            alt={"Logo of medical"}
            className="mb-5"
          />
          <nav className="space-y-4">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`w-full justify-start text-chiffon hover:text-salmon hover:bg-pine ${
                  activeTab === tab ? "bg-pine text-salmon" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "dashboard" && <BarChart2 className="mr-2 h-5 w-5" />}
                {tab === "appointments" && (
                  <Calendar className="mr-2 h-5 w-5" />
                )}
                {tab === "patients" && <Users className="mr-2 h-5 w-5" />}
                {tab === "doctors" && <User className="mr-2 h-5 w-5" />}
                {tab === "ai-assistant" && (
                  <BotMessageSquare className="mr-2 h-5 w-5" />
                )}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-pine">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3">
              {user ? (
                <AvatarFallback>
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </AvatarFallback>
              ) : (
                <Skeleton className="w-full h-full rounded-full bg-salmon" />
              )}
            </Avatar>

            <div>
              {user ? (
                <>
                  <p className="text-sm font-medium">
                    {user.role === "DOCTOR" ? `Dr. ` : ""}
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-[11px] text-salmon leading-tight">
                    {user.username}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className="w-[75%] h-[24px] rounded-full mb-2 bg-salmon" />
                  <Skeleton className="w-[60%] h-[20px] rounded-full bg-salmon" />
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-chiffon hover:text-salmon hover:bg-pine"
            onClick={logout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
