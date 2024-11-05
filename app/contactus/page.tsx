"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Calendar, Send, Loader2 } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-chiffon to-gray-100 flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row max-w-5xl w-full"
        >
          <div className="flex-1 p-8 lg:p-12">
            <div className="flex items-center mb-6">
              <Calendar className="h-8 w-8 text-tangerine mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Contact our team
              </h1>
            </div>
            <p className="text-gray-600 mb-8">
              Need help with something? Want a demo? Get in touch with our
              friendly team and we'll get back to you within 2 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="businessName"
                  className="text-sm font-medium text-gray-700"
                >
                  Name of Business
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                  placeholder="Acme Inc."
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Inquiry Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-tangerine focus:ring-tangerine min-h-[120px]"
                  placeholder="How can we help you?"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-tangerine hover:bg-pine text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-tangerine focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
          <div className="hidden lg:flex flex-1 bg-pine p-12 items-center justify-center">
            <div className="max-w-md text-white">
              <Image
                src="/images/testimonial1.jpg"
                width={400}
                height={400}
                alt="Healthcare professional"
                className="rounded-full mb-8 mx-auto shadow-lg"
              />
              <blockquote className="text-xl italic mb-4 relative">
                <span className="text-5xl absolute -top-4 -left-6 opacity-25">
                  "
                </span>
                MediCal has transformed our practice. It's intuitive, efficient,
                and has greatly improved our patient care.
                <span className="text-5xl absolute -bottom-8 -right-6 opacity-25">
                  "
                </span>
              </blockquote>
              <p className="font-semibold text-lg">Dr. Soo-Yeon Lee</p>
              <p className="text-salmon">
                General Practitioner, HealthFirst Clinic
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
