"use client";

import { useState, useEffect } from "react";
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
  X,
  BadgeAlert,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { summarizeSymptoms, recommendDoctor } from "@/config/geminiConfig";
import { useUserContext } from "@/app/context";
import api from "../api/api";
import { useRouter } from "next/navigation";
import { Doctor, Recommendation } from "@/types/types";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const appointmentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  symptoms: z.string().min(1, "Symptoms are required"),
  doctor: z.string().min(1, "Doctor selection is required"),
  appointmentDate: z.date({
    required_error: "Appointment date is required",
    invalid_type_error: "That's not a date!",
  }),
  appointmentTime: z.string().min(1, "Appointment time is required"),
});

type FormData = z.infer<typeof appointmentSchema>;

export default function BookAppointment() {
  const { user } = useUserContext();
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callingGemini, setCallingGemini] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [fetchingTimes, setFetchingTimes] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      username: user?.username || "",
      email: user?.email || "",
      symptoms: "",
      doctor: "",
      appointmentDate: undefined,
      appointmentTime: "",
    },
  });

  const symptoms = watch("symptoms");
  const selectedDoctor = watch("doctor");
  const selectedDate = watch("appointmentDate");

  useEffect(() => {
    if (user) {
      setValue("firstName", user.first_name);
      setValue("lastName", user.last_name);
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/getdoctors/");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (selectedDoctor && selectedDate) {
        setFetchingTimes(true);
        try {
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          const response = await api.get(
            `/doctors/${selectedDoctor}/available-slots/${formattedDate}/`
          );
          setAvailableTimes(response.data.available_slots);
        } catch (error) {
          console.error("Error fetching available times:", error);
          setAvailableTimes([]);
        } finally {
          setFetchingTimes(false);
        }
      }
    };

    fetchAvailableTimes();
  }, [selectedDoctor, selectedDate]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        doctor_id: data.doctor,
        booking_date: format(data.appointmentDate, "yyyy-MM-dd"),
        booking_time: data.appointmentTime,
        symptoms: data.symptoms,
        ai_summarized_symptoms: summary,
      };

      const response = await api.post("/make/appointment/", payload);
      toast({
        title: "Appointment Scheduled",
        description: `Doctor: ${
          doctors.find((doc) => doc.id === Number(data.doctor))?.first_name
        } ${doctors.find((doc) => doc.id === Number(data.doctor))?.last_name}
        
        Date: ${format(data.appointmentDate, "EEEE, MMMM dd, yyyy")}
        Time: ${data.appointmentTime}`,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAISummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallingGemini(true);

    try {
      const text = await summarizeSymptoms(symptoms);
      setSummary(text || "Error generating text.");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCallingGemini(false);
      setShowSummary(true);
    }
  };

  const handleAIRecommendation = async () => {
    setCallingGemini(true);

    try {
      const recommendObject = await recommendDoctor(doctors, summary);
      setRecommendation(recommendObject);
      if (recommendObject?.doctorId) {
        setValue("doctor", recommendObject.doctorId);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setCallingGemini(false);
      setShowRecommendation(true);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-sacramento"
              >
                First Name
              </Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                    disabled
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-sacramento"
              >
                Last Name
              </Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                    disabled
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-sacramento"
              >
                Username
              </Label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                    disabled
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-sacramento"
              >
                Email
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                    disabled
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="symptoms"
              className="text-sm font-medium text-sacramento"
            >
              Symptoms
            </Label>
            <Controller
              name="symptoms"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="symptoms"
                  className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine min-h-[100px]"
                  placeholder="Describe your symptoms..."
                  disabled={isSubmitting || callingGemini}
                />
              )}
            />
            {errors.symptoms && (
              <p className="text-red-500 text-sm">{errors.symptoms.message}</p>
            )}
            <Button
              type="button"
              onClick={handleAISummarize}
              className="w-full sm:w-auto mt-2 bg-tangerine hover:bg-pine text-white"
              disabled={isSubmitting || callingGemini || !symptoms}
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
          {showSummary && (
            <Alert className="border-tangerine">
              <Brain className="h-4 w-4" />
              <AlertTitle>
                Intelligent Symptom Summary
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeAlert className="h-3 w-3 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p className="w-64 text-xs break-words">
                        Our AI analyze and condense the list of symptoms you've
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
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pb-2">
              <Controller
                name="doctor"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting || callingGemini}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent className="bg-chiffon">
                      {doctors?.map((doctor) => (
                        <SelectItem
                          key={doctor.id}
                          value={String(doctor.id)}
                          className="hover:bg-salmon cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="overflow-hidden">
                              <div className="font-medium truncate">
                                {`${doctor.first_name} ${doctor.last_name}`}
                              </div>
                              <div className="text-sm text-pine truncate">
                                {doctor.short_bio}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Button
                type="button"
                onClick={handleAIRecommendation}
                className="w-full sm:w-auto bg-tangerine hover:bg-pine text-white"
                disabled={isSubmitting || callingGemini || !showSummary}
              >
                <Brain className="mr-2 h-4 w-4" />
                Recommend
              </Button>
            </div>
            {errors.doctor && (
              <p className="text-red-500 text-sm">{errors.doctor.message}</p>
            )}
            {showRecommendation && (
              <Alert className="border-tangerine">
                <Brain className="h-4 w-4" />
                <AlertTitle>
                  Intelligent Doctor Selector{" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeAlert className="h-3 w-3 inline" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white">
                        <p className="w-64 text-xs break-words">
                          Our AI analyzes your symptoms to recommend the best
                          doctor for your condition. Note: This is an AI
                          suggestion and not a substitute for professional
                          medical advice. Always consult a healthcare provider
                          for accurate diagnosis and treatment.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertTitle>
                <AlertDescription>
                  Recommended Doctor:
                  <span className="text-tangerine">
                    {` ${recommendation?.doctorName}`}
                  </span>
                  . {recommendation?.recommendation}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="appointmentDate"
                className="text-sm font-medium text-sacramento"
              >
                Appointment Date
              </Label>
              <Controller
                name="appointmentDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setValue("appointmentTime", "");
                        }}
                        disabled={(date) =>
                          date < new Date() ||
                          date >
                            new Date(
                              new Date().setMonth(new Date().getMonth() + 3)
                            )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.appointmentDate && (
                <p className="text-red-500 text-sm">
                  {errors.appointmentDate.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="appointmentTime"
                className="text-sm font-medium text-sacramento"
              >
                Appointment Time
              </Label>
              <Controller
                name="appointmentTime"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={
                      isSubmitting ||
                      callingGemini ||
                      fetchingTimes ||
                      !selectedDoctor ||
                      !selectedDate
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-chiffon">
                      {fetchingTimes ? (
                        <SelectItem value="null" disabled>
                          Loading available times...
                        </SelectItem>
                      ) : availableTimes.length > 0 ? (
                        availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="null" disabled>
                          No available times
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.appointmentTime && (
                <p className="text-red-500 text-sm">
                  {errors.appointmentTime.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="w-full sm:w-1/2 bg-tangerine hover:bg-pine text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pine focus:ring-opacity-50"
              disabled={isSubmitting || callingGemini}
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
              onClick={handleBack}
              className="w-full sm:w-1/2 bg-chiffon hover:bg-salmon text-sacramento font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-salmon focus:ring-opacity-50"
              disabled={isSubmitting || callingGemini}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
