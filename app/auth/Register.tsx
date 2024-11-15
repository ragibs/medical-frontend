"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Loader2, UserRoundCheck, CalendarIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import api from "../api/api";
import axios from "axios";

// List of all U.S. states with abbreviations
const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

// Define the schema with updated validations for username, zipcode, and phone
const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    date_of_birth: z.date({
      required_error: "Date of birth is required",
    }),
    username: z.string().min(1, "Username is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State is required"),
    zipcode: z
      .string()
      .length(5, "Zipcode must be exactly 5 digits")
      .regex(/^\d{5}$/, "Zipcode must be numeric"),
    phone: z
      .string()
      .min(10, "Phone number is required")
      .max(12, "Phone number should follow the format XXX-XXX-XXXX"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, ""); // Remove all non-numeric characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return value;
};

export default function Register() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    const formData = {
      username: data.username,
      email: data.email,
      password1: data.password,
      password2: data.confirmPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      date_of_birth: format(data.date_of_birth, "yyyy-MM-dd"),
    };

    setFormSubmitting(true);

    try {
      const response = await api.post("/register/patient/", formData);

      if (response.status === 201) {
        setFormSubmitting(false);
        setSubmitted(true);
        setSubmitMessage(response.data.message);
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      {!submitted && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name and Last Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={formSubmitting}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1915-01-01")
                        }
                        initialFocus
                        defaultMonth={new Date("1990-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a username"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formatPhoneNumber(field.value)}
                      onChange={(e) =>
                        field.onChange(formatPhoneNumber(e.target.value))
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your address"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* State Selector */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={formSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine">
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Zipcode */}
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your zipcode"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                      disabled={formSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-tangerine hover:bg-pine text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              disabled={formSubmitting}
            >
              {formSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      )}
      {submitted && (
        <div>
          <DotLottieReact
            src="https://lottie.host/11bf6450-d642-4904-b572-613d3fe15348/xsTHAmfKU1.json"
            loop
            autoplay
          />
          <Alert className=" border-tangerine ">
            <UserRoundCheck className="h-4 w-4" />
            <AlertTitle className="py-2">You're All Set!</AlertTitle>
            <AlertDescription>{submitMessage}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
