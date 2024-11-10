"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const adminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(1, "Title is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  tempPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof adminSchema>;

export default function AddAdminForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      username: "",
      email: "",
      tempPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Admin added:", data);
      // Here you would typically send the form data to your backend
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding admin:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
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
            Add an Admin
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      />
                    </FormControl>
                    <FormMessage />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-sacramento">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full rounded-md border-pine focus:border-tangerine focus:ring-tangerine"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    />
                  </FormControl>
                  <FormMessage />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={generateRandomPassword}
                      className="bg-tangerine hover:bg-pine text-white"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
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
                    Add Admin
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
