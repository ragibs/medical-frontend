"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Clock, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

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
                <Link href="/auth">
                  <Button className="bg-tangerine text-white hover:bg-pine">
                    <span className="md:hidden">Try Now</span>
                    <span className="hidden md:inline">Get Started</span>
                  </Button>
                </Link>

                <Link href="/contactus">
                  <Button
                    variant="outline"
                    className="text-tangerine border-tangerine hover:bg-pine hover:text-white"
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
                style={{ width: "100%", height: "auto" }}
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

          <section className="py-20 bg-chiffon">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                Frequently Asked Questions
              </h2>
              <Accordion
                type="single"
                collapsible
                className="max-w-3xl mx-auto"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Who is this demo intended for?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-pine">
                    The demo is designed for clinics and healthcare
                    professionals interested in exploring MediCal, our
                    comprehensive SaaS solution for appointment management and
                    patient engagement.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Who can access the authentication page?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-pine">
                    The authentication page is intended for patients who are
                    either new to or currently registered with clinics utilizing
                    MediCal for appointment scheduling. It allows them to sign
                    up or log in to access their clinic’s booking platform.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How can I access the admin dashboard?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-pine">
                    Admin access credentials will be provided to you upon setup.
                    Use these credentials on the /auth page to access the admin
                    dashboard, where you can manage appointments, users, and
                    other administrative tasks.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How can doctors be registered on the platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-pine">
                    With admin rights, you can register doctors by providing
                    their details, such as name, email, and a temporary
                    password. Once registered, doctors can log in through the
                    /auth page to access their personalized dashboard.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How can additional admins be added?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-pine">
                    Existing admins have the ability to add other
                    administrators. New admins will have the same level of
                    access and privileges to manage the clinic’s operations
                    efficiently.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full bg-tangerine text-white hover:bg-pine rounded-md"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center space-y-4">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                      <h2 className="text-xl font-semibold text-gray-700">
                        Thank you for your message!
                      </h2>
                      <p className="text-gray-600">
                        We will get back to you as soon as possible.
                      </p>
                    </div>
                  )}
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
