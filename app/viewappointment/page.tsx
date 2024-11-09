"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, X, Edit, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function ViewAppointment() {
  const router = useRouter();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("No notes added yet.");

  // Dummy data
  const appointmentData = {
    patientName: "John Doe",
    doctorName: "Dr. Jane Smith",
    date: new Date("2023-06-15"),
    time: "10:00 AM",
    symptoms: "Persistent headache and dizziness",
    aiSummarizedSymptoms:
      "Patient reports chronic cephalgia with associated vertigo, potentially indicating underlying neurological concerns.",
    createdAt: new Date("2023-06-10"),
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleCancelAppointment = () => {
    // Implement appointment cancellation logic here
    console.log("Appointment cancelled");
    router.push("/dashboard");
  };

  const handleEditNotes = () => {
    setIsEditingNotes(!isEditingNotes);
    if (isEditingNotes) {
      // Save notes logic here
      console.log("Notes saved:", notes);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chiffon to-salmon flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden p-4 sm:p-8 w-full max-w-2xl relative"
      >
        <Button
          onClick={handleBack}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-sacramento hover:text-pine"
        >
          <X className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <div className="flex items-center mb-6 pr-8 sm:pr-0">
          <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-tangerine mr-2 sm:mr-3 flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sacramento">
            View Appointment
          </h1>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="patientName"
                className="text-sm font-medium text-sacramento"
              >
                Patient Name
              </Label>
              <Input
                id="patientName"
                value={appointmentData.patientName}
                readOnly
                className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="doctorName"
                className="text-sm font-medium text-sacramento"
              >
                Doctor Name
              </Label>
              <Input
                id="doctorName"
                value={appointmentData.doctorName}
                readOnly
                className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-medium text-sacramento"
              >
                Date
              </Label>
              <Input
                id="date"
                value={format(appointmentData.date, "MMMM d, yyyy")}
                readOnly
                className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="time"
                className="text-sm font-medium text-sacramento"
              >
                Time
              </Label>
              <Input
                id="time"
                value={appointmentData.time}
                readOnly
                className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="symptoms"
              className="text-sm font-medium text-sacramento"
            >
              Symptoms
            </Label>
            <Textarea
              id="symptoms"
              value={appointmentData.symptoms}
              readOnly
              className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="aiSummarizedSymptoms"
              className="text-sm font-medium text-sacramento"
            >
              AI Summarized Symptoms
            </Label>
            <Textarea
              id="aiSummarizedSymptoms"
              value={appointmentData.aiSummarizedSymptoms}
              readOnly
              className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-sacramento"
              >
                Notes
              </Label>
              <Button
                type="button"
                onClick={handleEditNotes}
                className="bg-tangerine hover:bg-pine text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pine focus:ring-opacity-50"
              >
                {isEditingNotes ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Notes
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Notes
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              readOnly={!isEditingNotes}
              className={`w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine min-h-[100px] ${
                isEditingNotes ? "bg-white" : "bg-chiffon"
              }`}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="createdAt"
              className="text-sm font-medium text-sacramento"
            >
              Created At
            </Label>
            <Input
              id="createdAt"
              value={format(
                appointmentData.createdAt,
                "MMMM d, yyyy 'at' h:mm a"
              )}
              readOnly
              className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine bg-chiffon"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleCancelAppointment}
              className="w-full sm:w-1/2 bg-red-500 hover:bg-red-800 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pine focus:ring-opacity-50"
            >
              Cancel Appointment
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
