"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Clock, Send } from "lucide-react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PricingCard from "@/components/PricingCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-chiffon text-gray-900 flex flex-col">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className="flex-grow bg-chiffon">
          <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Streamline Your Medical Practice
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                MediCal is a comprehensive SaaS solution for appointment
                booking, patient and doctor management. Elevate your healthcare
                services with our state-of-the-art platform.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-tangerine text-white hover:bg-salmon">
                  <span className="md:hidden">Try Now</span>
                  <span className="hidden md:inline">Get Started</span>
                </Button>
                <Link href="/contactus">
                  <Button
                    variant="outline"
                    className="text-tangerine border-tangerine hover:bg-salmon hover:text-white"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/heroimage.png"
                width={600}
                height={600}
                alt="MediCal App"
                className="rounded-lg sm:w-300"
              />
            </div>
          </section>

          <section className="bg-chiffon py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                Innovative Features You'll Love
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Calendar className="h-12 w-12 text-tangerine" />}
                  title="Easy Scheduling"
                  description="Effortlessly manage appointments with our intuitive booking system."
                />
                <FeatureCard
                  icon={<Users className="h-12 w-12 text-tangerine" />}
                  title="Patient Management"
                  description="Keep track of patient records, history, and preferences in one place."
                />
                <FeatureCard
                  icon={<Clock className="h-12 w-12 text-tangerine" />}
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
          <section className="bg-chiffon py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                Simple Pricing
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <PricingCard
                  title="Basic"
                  price="$9"
                  features={[
                    "1 User",
                    "Online Support",
                    "1000 Monthly Requests",
                    "1 GB Data Package",
                  ]}
                />
                <PricingCard
                  title="Advanced"
                  price="$29"
                  features={[
                    "Up to 5 Users",
                    "Priority Suppor",
                    "5000 Monthly Requests",
                    "5 GB Data Package",
                  ]}
                  highlighted={true}
                />
                <PricingCard
                  title="Premium"
                  price="$59"
                  features={[
                    "Unlimited Users",
                    "Premium Support",
                    "Unlimited Monthly Requests",
                    "10 GB Data Package",
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-b from-chiffon to-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                Contact Us
              </h2>
              <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    Get in Touch
                  </h3>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="w-full rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        className="w-full rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        required
                        className="w-full rounded-md"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-tangerine text-white hover:bg-salmon rounded-md"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
