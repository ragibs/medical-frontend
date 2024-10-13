import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  User,
  Users,
  BarChart2,
  BotMessageSquare,
  LogOut,
} from "lucide-react";

export function Sidebar({ activeTab, setActiveTab, sidebarOpen }) {
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-sacramento to-pine text-chiffon shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">MediDash</h2>
          <nav className="space-y-4">
            {[
              "dashboard",
              "appointments",
              "patients",
              "doctors",
              "ai-assistant",
            ].map((tab) => (
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
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dr. Jane Doe</p>
              <p className="text-xs text-salmon">jane.doe@example.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-chiffon hover:text-salmon hover:bg-pine"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
