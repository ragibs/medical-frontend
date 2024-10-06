"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Clock,
  Bell,
  BarChart,
  Shield,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import FeatureListItem from "@/components/FeatureListItem";
import { motion } from "framer-motion";
import Link from "next/link";

const Features = () => {
  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className="flex-grow">
          <section className="bg-emerald-50 py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Powerful Features for Modern Healthcare
              </h1>
              <p className="text-xl mb-12 text-center max-w-3xl mx-auto">
                Discover how MediCal's comprehensive suite of features can
                streamline your medical practice and enhance patient care.
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Intuitive Appointment Scheduling
                  </h2>
                  <p className="text-lg mb-6">
                    Our advanced scheduling system allows patients to book
                    appointments easily while giving you full control over your
                    calendar.
                  </p>
                  <ul className="space-y-4">
                    <FeatureListItem
                      icon={<Calendar className="h-6 w-6 text-emerald-700" />}
                      text="Smart conflict detection"
                    />
                    <FeatureListItem
                      icon={<Users className="h-6 w-6 text-emerald-700" />}
                      text="Multi-provider support"
                    />
                    <FeatureListItem
                      icon={<Bell className="h-6 w-6 text-emerald-700" />}
                      text="Automated reminders"
                    />
                  </ul>
                </div>
                <div className="mt-8 md:mt-0">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Appointment Scheduling Interface"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Patient Management Dashboard"
                    className="rounded-lg shadow-xl"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl font-bold mb-6">
                    Comprehensive Patient Management
                  </h2>
                  <p className="text-lg mb-6">
                    Keep all your patient information organized and easily
                    accessible, improving the efficiency of your practice.
                  </p>
                  <ul className="space-y-4">
                    <FeatureListItem
                      icon={<BarChart className="h-6 w-6 text-emerald-700" />}
                      text="Detailed patient history"
                    />
                    <FeatureListItem
                      icon={<Shield className="h-6 w-6 text-emerald-700" />}
                      text="Secure data storage"
                    />
                    <FeatureListItem
                      icon={<Clock className="h-6 w-6 text-emerald-700" />}
                      text="Quick access to records"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                More Powerful Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Bell className="h-12 w-12 text-emerald-700" />}
                  title="Smart Notifications"
                  description="Keep patients and staff informed with automated reminders and important updates."
                />
                <FeatureCard
                  icon={<BarChart className="h-12 w-12 text-emerald-700" />}
                  title="Analytics Dashboard"
                  description="Gain insights into your practice with comprehensive reporting and analytics tools."
                />
                <FeatureCard
                  icon={<Shield className="h-12 w-12 text-emerald-700" />}
                  title="HIPAA Compliant"
                  description="Rest easy knowing that all patient data is securely stored and transmitted."
                />
              </div>
            </div>
          </section>

          <section className="bg-emerald-50 py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of healthcare providers who have streamlined
                their operations with MediCal.
              </p>
              <Link href="/contactus">
                <Button className="bg-emerald-700 text-white hover:bg-emerald-800 text-lg px-8 py-3">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Features;
