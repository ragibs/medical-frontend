"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, CalendarPlus, Ellipsis, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import api from "../api/api";
import { Doctor, Patient } from "@/types/types";
import { summarizeSymptoms } from "@/config/geminiConfig";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  symptoms: z.string().min(1, "Please describe the symptoms"),
  doctorId: z.string().min(1, "Please select a doctor"),
  appointmentDate: z.date({
    required_error: "Please select an appointment date",
  }),
  appointmentTime: z.string().min(1, "Please select an appointment time"),
});

type FormData = z.infer<typeof appointmentSchema>;

export default function BookAppointmentForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [callingGemini, setCallingGemini] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [fetchingTimes, setFetchingTimes] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: "",
      symptoms: "",
      doctorId: "",
      appointmentTime: "",
    },
  });

  const { watch, setValue } = form;
  const selectedDoctor = watch("doctorId");
  const selectedDate = watch("appointmentDate");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/getpatients/");
        setPatients(response?.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await api.get("/getdoctors/");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchPatients();
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
    setValue("appointmentTime", "");
  }, [selectedDoctor, selectedDate, setValue]);

  const handleAISummarize = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const symptoms = form.getValues("symptoms");
    if (!symptoms) {
      form.setError("symptoms", {
        type: "manual",
        message: "Please enter symptoms before summarizing",
      });
      return;
    }

    setCallingGemini(true);

    try {
      const text = await summarizeSymptoms(symptoms);
      setSummary(text || "Error generating text.");
      setShowSummary(true);
    } catch (error) {
      console.error("Error:", error);
      form.setError("symptoms", {
        type: "manual",
        message: "Error summarizing symptoms. Please try again.",
      });
    } finally {
      setCallingGemini(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        patient_id: data.patientId,
        doctor_id: data.doctorId,
        booking_date: format(data.appointmentDate, "yyyy-MM-dd"),
        booking_time: data.appointmentTime,
        symptoms: data.symptoms,
        ai_summarized_symptoms: summary,
      };

      const response = await api.post("make/appointment/", payload);

      toast({
        title: "Appointment Scheduled",
        description: `Successfully booked appointment with Dr. ${
          doctors.find((doc) => doc.id === Number(data.doctorId))?.first_name
        } ${doctors.find((doc) => doc.id === Number(data.doctorId))?.last_name}
          on ${format(data.appointmentDate, "EEEE, MMMM dd, yyyy")} at ${
          data.appointmentTime
        }`,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Error",
        description: "Failed to book the appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <CalendarPlus className="h-6 w-6 sm:h-8 sm:w-8 text-tangerine mr-2 sm:mr-3 flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sacramento">
            Book an Appointment
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Select Patient
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine">
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={String(patient.id)}>
                          {`${patient.first_name} ${patient.last_name}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Symptoms
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine min-h-[100px]"
                        placeholder="Describe the symptoms..."
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
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

            {showSummary && (
              <Alert className="bg-chiffon border-tangerine">
                <Brain className="h-4 w-4" />
                <AlertTitle>Symptom Summary</AlertTitle>
                <AlertDescription>{summary}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Select Doctor
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine">
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={String(doctor.id)}>
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
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Appointment Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarPlus className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
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
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointmentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Appointment Time
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={
                        !selectedDoctor || !selectedDate || fetchingTimes
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine">
                          <SelectValue
                            placeholder={
                              fetchingTimes ? "Loading..." : "Select a time"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
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
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Book Appointment
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-1/2 bg-chiffon hover:bg-salmon text-sacramento font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-salmon focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
