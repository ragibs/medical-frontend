"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Loader2, X, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import api from "../api/api";

const doctorSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  tempPassword: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  specialization: z.string().min(1, "Specialization is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().min(5, "Zipcode must be at least 5 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  shortBio: z.string().max(100, "Short bio must be 100 characters or less"),
  yearsOfExperience: z.coerce
    .number()
    .min(0, "Years of experience must be 0 or greater"),
});

type FormData = z.infer<typeof doctorSchema>;

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

export default function AddDoctorForm() {
  const { toast } = useToast();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      username: "",
      email: "",
      tempPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      specialization: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      bio: "",
      shortBio: "",
      yearsOfExperience: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const payload = {
      username: data.username,
      email: data.email,
      password1: data.tempPassword,
      password2: data.tempPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      specialization: data.specialization,
      address: data.address,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      bio: data.bio,
      short_bio: data.shortBio,
      years_experience: data.yearsOfExperience,
    };

    try {
      const response = await api.post("/register/doctor/", payload);

      toast({
        title: "Doctor Added",
        description: `Doctor ${data.firstName} ${data.lastName} has been successfully added.`,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding doctor:", error);

      toast({
        title: "Error",
        description:
          "Failed to add doctor. Please check the form and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // Remove all non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const generateRandomPassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    form.setValue("tempPassword", password);
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
          <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-tangerine mr-2 sm:mr-3 flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sacramento">
            Add a Doctor
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tempPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Temporary Password
                    </FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={generateRandomPassword}
                        disabled={isSubmitting}
                        className="bg-tangerine hover:bg-pine text-white"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(formatPhoneNumber(e.target.value))
                        }
                        value={formatPhoneNumber(field.value)}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
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
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Specialization
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      State
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                          disabled={isSubmitting}
                        >
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
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-sacramento">
                      Zipcode
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine min-h-[100px]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Short Bio
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Years of Experience
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                className="w-full sm:w-1/2 bg-tangerine hover:bg-pine text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pine focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Doctor
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
