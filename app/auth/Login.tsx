"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(2, "Password must be at least 2 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [formSubmitting, setFormSubmitting] = useState(false);

  // Set up React Hook Form with Zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "", // Initialize with an empty string
      password: "", // Initialize with an empty string
    },
  });

  // Loginform submission
  const onSubmit = async (data: LoginFormValues) => {
    setFormSubmitting(true);
    try {
      await login(data.username, data.password);
      router.push("/dashboard");
      setFormSubmitting(false);
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("username", { message: "Invalid credentials" });
      form.setError("password", { message: "Please check your credentials" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                  disabled={formSubmitting}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
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
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-tangerine hover:bg-pine text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          disabled={formSubmitting}
        >
          {formSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Login;
