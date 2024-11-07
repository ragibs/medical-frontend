"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().min(8, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  // Step 2: Set up React Hook Form with Zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Zod resolver
  });

  // Step 3: Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
    // Handle login logic here, e.g., send data to API
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
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default Login;
