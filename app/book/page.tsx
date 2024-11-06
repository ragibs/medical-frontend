"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  Send,
  Loader2,
  Ellipsis,
  Brain,
  Phone,
  Mail,
  X,
  BadgeAlert,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateText } from "@/config/geminiConfig";

const doctors = [
  {
    id: "dr-smith",
    name: "Dr. Smith",
    avatar: "/placeholder.svg?height=50&width=50",
    description: "Cardiologist with 15 years of experience",
  },
  {
    id: "dr-johnson",
    name: "Dr. Johnson",
    avatar: "/placeholder.svg?height=50&width=50",
    description: "Pediatrician specializing in newborn care",
  },
  {
    id: "dr-williams",
    name: "Dr. Williams",
    avatar: "/placeholder.svg?height=50&width=50",
    description: "Dermatologist focusing on skin cancer prevention",
  },
];

const appointmentTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: undefined as Date | undefined,
    phone: "",
    email: "",
    symptoms: "",
    doctor: "",
    appointmentDate: undefined as Date | undefined,
    appointmentTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callingGemini, setCallingGemini] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [prompt, setPrompt] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "symptoms") {
      setPrompt(value);
    }
  };

  const handleDateChange = (
    date: Date | undefined,
    field: "dob" | "appointmentDate"
  ) => {
    setFormData((prevState) => ({ ...prevState, [field]: date }));
  };

  const handleDoctorChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, doctor: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Appointment booked:", formData);
    setIsSubmitting(false);
    // Here you would typically send the form data to your backend
  };

  const handleAISummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallingGemini(true);

    try {
      const text = await generateText(prompt);
      setSummary(text || "Error generating text.");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCallingGemini(false);
      setShowSummary(true);
    }
  };

  const handleAIRecommendation = () => {
    // Placeholder for AI doctor recommendation functionality
    console.log("AI Recommendation clicked");
  };

  const handleBack = () => {
    // Placeholder for back functionality
    console.log("Back button clicked");
    // Here you would typically implement navigation back to the previous page
  };

  const handleCancel = () => {
    // Placeholder for cancel functionality
    console.log("Cancel button clicked");
    // Here you would typically clear the form or navigate away from the booking page
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
          <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-tangerine mr-2 sm:mr-3 flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sacramento">
            Book an Appointment
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-sacramento"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                placeholder="John"
                disabled={isSubmitting || callingGemini}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-sacramento"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                placeholder="Doe"
                disabled={isSubmitting || callingGemini}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="dob"
              className="text-sm font-medium text-sacramento"
            >
              Date of Birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dob && "text-muted-foreground"
                  )}
                  disabled={isSubmitting || callingGemini}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dob ? (
                    format(formData.dob, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dob}
                  onSelect={(date) => handleDateChange(date, "dob")}
                  initialFocus
                  defaultMonth={new Date(1990, 0, 1)}
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-sacramento"
              >
                Phone Number
              </Label>
              <div className="flex">
                <Phone className="h-5 w-5 text-pine mr-2 self-center" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                  placeholder="(123) 456-7890"
                  disabled={isSubmitting || callingGemini}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-sacramento"
              >
                Email
              </Label>
              <div className="flex">
                <Mail className="h-5 w-5 text-pine mr-2 self-center" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                  placeholder="john@example.com"
                  disabled={isSubmitting || callingGemini}
                />
              </div>
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
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine min-h-[100px]"
              placeholder="Describe your symptoms..."
              disabled={isSubmitting || callingGemini}
            />
            <Button
              type="button"
              onClick={handleAISummarize}
              className="w-full sm:w-auto mt-2 bg-tangerine hover:bg-pine text-white"
              disabled={isSubmitting || callingGemini}
            >
              {callingGemini ? (
                <>
                  <Ellipsis className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Summarize
                </>
              )}
            </Button>
          </div>
          {/* Alter section for the AI Summary */}
          {showSummary && (
            <Alert className=" border-tangerine">
              <Brain className="h-4 w-4" />
              <AlertTitle>
                AI-Summarized Symptoms{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeAlert className="h-3 w-3 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white ">
                      <p className="w-64 text-xs break-words">
                        Our AI analyze and condense the list of symptoms you’ve
                        entered into a brief, easy-to-understand summary. This
                        can help your healthcare provider quickly grasp the key
                        details of your condition.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </AlertTitle>
              <AlertDescription>{summary}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label
              htmlFor="doctor"
              className="text-sm font-medium text-sacramento"
            >
              Choose a Doctor
            </Label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Select
                onValueChange={handleDoctorChange}
                disabled={isSubmitting || callingGemini}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent className="bg-chiffon">
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center">
                        <Image
                          src={doctor.avatar}
                          alt={doctor.name}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                        <div className="overflow-hidden">
                          <div className="font-medium truncate">
                            {doctor.name}
                          </div>
                          <div className="text-sm text-pine truncate">
                            {doctor.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={handleAIRecommendation}
                className="w-full sm:w-auto bg-tangerine hover:bg-pine text-white"
                disabled={isSubmitting || callingGemini}
              >
                <Brain className="mr-2 h-4 w-4" />
                Recommend
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="appointmentDate"
                className="text-sm font-medium text-sacramento"
              >
                Appointment Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.appointmentDate && "text-muted-foreground"
                    )}
                    disabled={isSubmitting || callingGemini}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.appointmentDate ? (
                      format(formData.appointmentDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDate}
                    onSelect={(date) =>
                      handleDateChange(date, "appointmentDate")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="appointmentTime"
                className="text-sm font-medium text-sacramento"
              >
                Appointment Time
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, appointmentTime: value }))
                }
                disabled={isSubmitting || callingGemini}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="bg-chiffon">
                  {appointmentTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="w-full sm:w-1/2 bg-tangerine hover:bg-pine text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pine focus:ring-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Book Appointment
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-1/2 bg-chiffon hover:bg-salmon text-sacramento font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none  focus:ring-2 focus:ring-salmon focus:ring-opacity-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
