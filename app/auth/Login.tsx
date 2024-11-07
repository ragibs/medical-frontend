"use client";

import Cookies from "js-cookie";
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
import { useRouter } from "next/navigation";
import { login } from "../auth/auth"; // Import the login function from auth.ts

const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(2, "Password must be at least 2 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter(); // Router to navigate after login

  // Set up React Hook Form with Zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "", // Initialize with an empty string
      password: "", // Initialize with an empty string
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data.username, data.password); // Call the login function from auth.ts

      // Debugging step: Log the response to ensure tokens are received
      console.log("Login successful. Tokens:", response);

      // Store tokens in cookies manually (in case there's an issue with the `login` function)
      Cookies.set("medappapi_access_token", response.access, { secure: true });
      Cookies.set("medappapi_refresh_token", response.refresh, {
        secure: true,
      });

      // Debugging step: Check if cookies are being set
      console.log("Access Token:", Cookies.get("medappapi_access_token"));
      console.log("Refresh Token:", Cookies.get("medappapi_refresh_token"));

      // Redirect to the dashboard after successful login
      router.push("/dashboard"); // Redirect after successful login
      console.log("Redirecting to /dashboard");
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
