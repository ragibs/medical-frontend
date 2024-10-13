"use client";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import Header from "./DashHeader";
import { SummaryCards } from "./SummaryCards";
import { Charts } from "./Charts";
import { RecentActivity } from "./RecentActivity";
import { TabContent } from "./TabContent";
import AIAssistantButton from "./AIAssistantButton";
import { AIAssistant } from "./AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
const appointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    date: "2023-06-15",
    time: "10:00 AM",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Johnson",
    date: "2023-06-16",
    time: "2:30 PM",
  },
  {
    id: 3,
    patient: "Bob Brown",
    doctor: "Dr. Lee",
    date: "2023-06-17",
    time: "11:15 AM",
  },
];

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    contact: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    contact: "234-567-8901",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Bob Brown",
    age: 42,
    contact: "345-678-9012",
    email: "bob.brown@example.com",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialization: "Cardiology",
    contact: "987-654-3210",
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialization: "Pediatrics",
    contact: "876-543-2109",
  },
  {
    id: 3,
    name: "Dr. Lee",
    specialization: "Neurology",
    contact: "765-432-1098",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const toggleAiAssistant = () => {
    setAiAssistantOpen(!aiAssistantOpen);
    if (!aiAssistantOpen) {
      setActiveTab("ai-assistant");
    } else {
      setActiveTab("dashboard");
    }
  };

  return (
    <div className="flex h-screen bg-chiffon">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
      />
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Header setSidebarOpen={setSidebarOpen} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "dashboard" && (
                  <>
                    <SummaryCards />
                    <Charts />
                    <RecentActivity appointments={appointments} />
                  </>
                )}

                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="hidden">
                    {[
                      "dashboard",
                      "appointments",
                      "patients",
                      "doctors",
                      "ai-assistant",
                    ].map((tab) => (
                      <TabsTrigger key={tab} value={tab}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {["appointments", "patients", "doctors"].map((tab) => (
                    <TabsContent key={tab} value={tab}>
                      <TabContent
                        tab={tab}
                        data={
                          tab === "appointments"
                            ? appointments
                            : tab === "patients"
                            ? patients
                            : doctors
                        }
                      />
                    </TabsContent>
                  ))}
                  <TabsContent value="ai-assistant">
                    <AIAssistant />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AIAssistantButton
          toggleAiAssistant={toggleAiAssistant}
          isOpen={aiAssistantOpen}
        />
      </main>
    </div>
  );
}
