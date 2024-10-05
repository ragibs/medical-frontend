"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock } from "lucide-react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Streamline Your Medical Practice
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              MediCal is a comprehensive SaaS solution for appointment booking,
              patient and doctor management. Elevate your healthcare services
              with our state-of-the-art platform.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                <span className="md:hidden">Try Now</span>
                <span className="hidden md:inline">Get Started</span>
              </Button>
              <Button
                variant="outline"
                className="text-emerald-700 border-emerald-700 hover:bg-emerald-700 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/heroimage.png"
              width={400}
              height={600}
              alt="MediCal App"
              className="rounded-lg"
            />
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Innovative Features You'll Love
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Calendar className="h-12 w-12 text-emerald-700" />}
                title="Easy Scheduling"
                description="Effortlessly manage appointments with our intuitive booking system."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-emerald-700" />}
                title="Patient Management"
                description="Keep track of patient records, history, and preferences in one place."
              />
              <FeatureCard
                icon={<Clock className="h-12 w-12 text-emerald-700" />}
                title="Time-Saving Automation"
                description="Automate reminders, follow-ups, and routine tasks to save time."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              What Our Clients Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="MediCal has revolutionized how we manage our clinic. It's user-friendly and incredibly efficient."
                author="Dr. Soo-Yeon Lee "
                role="General Practitioner"
                avatarSrc="/images/testimonial1.jpg"
                color="bg-lime-300"
              />
              <TestimonialCard
                quote="The patient management features are outstanding. It's made our administrative work so much easier."
                author="Kwame Zuberi"
                role="Clinic Manager"
                avatarSrc="/images/testimonial2.jpg"
                color="bg-indigo-300"
              />
              <TestimonialCard
                quote="Our patients love the easy booking system. It's greatly improved their experience with our practice."
                author="Sarah Connor"
                role="Receptionist"
                avatarSrc="/images/testimonial3.webp"
                color="bg-violet-300"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
