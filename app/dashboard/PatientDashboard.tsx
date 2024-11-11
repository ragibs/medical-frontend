"use client";
import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./DashHeader";
import { SummaryCards } from "./SummaryCards";
import { Charts } from "./Charts";
import RecentActivity from "./RecentActivity";
import TabContent from "./TabContent";
import AIAssistantButton from "./AIAssistantButton";
import { AIAssistant } from "./AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api";
import { useUserContext } from "../context";
import { Doctor, Patient, Appointment } from "@/types/types";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const { user } = useUserContext();

  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/getdoctors/");
      setDoctorList(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get("/getpatients/");
      setPatientList(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchAllAppointments = async () => {
    try {
      const response = await api.get("/view/all-appointments/");
      setAppointmentList(response.data);
    } catch (error) {
      console.error("Error fetching all appointments:", error);
    }
  };

  const fetchPatientAppointments = async () => {
    try {
      if (user?.id) {
        const response = await api.get(`/view/patient-appointment/${user.id}/`);
        setAppointmentList(response.data);
      }
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  const fetchDoctorAppointments = async () => {
    try {
      if (user?.id) {
        const response = await api.get(`/view/doctor-appointment/${user.id}/`);
        setAppointmentList(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setActiveTab("dashboard");
      fetchDoctors();
      fetchPatients();
      fetchAllAppointments();
    } else if (user?.role === "PATIENT") {
      setActiveTab("appointments");
      fetchPatientAppointments();
    } else if (user?.role === "DOCTOR") {
      setActiveTab("appointments");
      fetchDoctorAppointments();
    }
  }, [user]);

  const toggleAiAssistant = () => {
    setAiAssistantOpen((prev) => !prev);

    if (!aiAssistantOpen) {
      setActiveTab("ai-assistant");
    } else {
      if (user?.role === "ADMIN") {
        setActiveTab("dashboard");
      } else if (user?.role === "DOCTOR" || user?.role === "PATIENT") {
        setActiveTab("appointments");
      } else {
        setActiveTab("dashboard");
      }
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
                    <RecentActivity appointments={appointmentList} />
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
                        fetchPatientAppointments={fetchPatientAppointments}
                        data={
                          tab === "appointments"
                            ? appointmentList
                            : tab === "patients"
                            ? patientList
                            : doctorList
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
};

export default PatientDashboard;
