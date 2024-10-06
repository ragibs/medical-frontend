"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { KeySquare } from "lucide-react";

const Auth = () => {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2"
      >
        <div className="flex flex-col items-center justify-center bg-muted p-4 md:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="flex-1 p-8 lg:p-12">
              <div className="flex items-center mb-6">
                <KeySquare className="h-8 w-8 text-emerald-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to MediCal
                </h1>
              </div>
              <p className="text-gray-600 mb-8">
                Join our healthcare community or log in to access your
                personalized dashboard.
              </p>

              <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Login />
                </TabsContent>
                <TabsContent value="register">
                  <Register />
                </TabsContent>
              </Tabs>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              By clicking Login or Register, you agree to our{" "}
              <Link href="#" className="underline" prefetch={false}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline" prefetch={false}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 bg-emerald-600 p-12 items-center justify-center">
          <div className="max-w-md text-white">
            <Image
              src="/images/testimonial2.jpg"
              width={400}
              height={400}
              alt="Healthcare professional"
              className="rounded-full mb-8 mx-auto shadow-lg"
            />
            <blockquote className="text-xl italic mb-4 relative">
              <span className="text-5xl absolute -top-4 -left-6 opacity-25">
                "
              </span>
              Since implementing MediCal, we've seen a staggering 30% increase
              in productivity.
              <span className="text-5xl absolute -bottom-8 -right-6 opacity-25">
                "
              </span>
            </blockquote>
            <p className="font-semibold text-lg">Kwame Zuberi</p>
            <p className="text-emerald-200">
              Clinic Manager, St. Michael's Health Centre
            </p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Auth;
