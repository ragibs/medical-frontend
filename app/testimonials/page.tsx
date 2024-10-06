"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Soo-Yeon Lee",
    role: "General Practitioner",
    image: "/images/testimonial1.jpg",
    quote:
      "MediCal has revolutionized how we manage our clinic. It's not just user-friendly; it's a game-changer for our entire operation. The appointment scheduling feature has significantly reduced our no-show rates, saving us countless hours and resources. But what truly sets MediCal apart is its comprehensive approach to patient care. From streamlined check-ins to detailed medical history tracking, every aspect of our patient interactions has been enhanced. The intuitive interface means less time spent on administrative tasks and more time focusing on what really matters - our patients. It's rare to find a solution that so perfectly balances efficiency with quality of care, but MediCal has achieved just that.",
    color: "bg-blue-100",
  },
  {
    name: "Kwame Zuberi",
    role: "Clinic Manager",
    image: "/images/testimonial2.jpg",
    quote:
      "As a clinic manager, I've worked with numerous practice management systems, but MediCal stands head and shoulders above the rest. The patient management features are nothing short of outstanding. Since implementing MediCal, we've seen a staggering 30% increase in productivity. This isn't just about doing things faster; it's about doing them better. The customizable dashboards give us real-time insights into our clinic's performance, allowing us to make data-driven decisions that have significantly improved our operational efficiency. What's more, the seamless integration with our existing systems was a pleasant surprise - it was like MediCal was built specifically for our clinic. The support team has been exceptional, always ready to assist and continually rolling out updates based on user feedback. It's not just a tool; it's a partner in our clinic's success.",
    color: "bg-green-100",
  },
  {
    name: "Sarah Connor",
    role: "Receptionist",
    image: "/images/testimonial3.webp",
    quote:
      "From a receptionist's perspective, MediCal has been a revelation. The easy booking system has transformed how our patients interact with our practice. Gone are the days of long phone queues and double-booked appointments. Patients can now book their appointments online, choosing times that suit them best, which has led to a noticeable improvement in patient satisfaction. The automated reminders have been a game-changer for reducing missed appointments - we've seen a 50% decrease in no-shows! But it's not just about appointments. The patient portal allows our patients to access their medical records, test results, and even communicate with their healthcare providers securely. This level of accessibility and transparency has greatly improved our relationship with our patients. They feel more involved in their healthcare journey, and it shows in their engagement and compliance with treatment plans.",
    color: "bg-purple-100",
  },
  {
    name: "Dr. Dzulkifli Lantana",
    role: "Pediatrician",
    image: "/images/testimonial4.jpg",
    quote:
      "As a pediatrician, keeping track of growth charts, vaccination schedules, and developmental milestones is crucial. MediCal has streamlined this process in ways I never thought possible. The pediatric-specific features are incredibly detailed and user-friendly. I can pull up a child's complete medical history, including growth trends and immunization records, with just a few clicks. This level of organization has made my practice more efficient and, more importantly, more accurate. The ability to set reminders for follow-ups and vaccinations has ensured that no child falls through the cracks in their care schedule. Parents have also expressed how much they appreciate the detailed visit summaries and care instructions available through the patient portal. It's improved communication and helped parents feel more involved in their child's healthcare. MediCal isn't just a tool; it's become an indispensable part of providing top-notch pediatric care.",
    color: "bg-yellow-100",
  },
  {
    name: "Vinh Thang",
    role: "Practice Administrator",
    image: "/images/testimonial5.jpg",
    quote:
      "The reporting and analytics tools in MediCal have revolutionized how we run our multi-specialty practice. As a practice administrator, I need a bird's-eye view of our operations, and MediCal delivers this and more. The customizable dashboards allow me to track key performance indicators across all departments in real-time. This has been invaluable for identifying bottlenecks, optimizing resource allocation, and improving overall efficiency. The financial reporting features have streamlined our billing processes and improved our revenue cycle management. We've seen a 15% increase in our clean claims rate since implementing MediCal. But what truly sets it apart is how it helps us improve patient care. The patient satisfaction surveys integrated into the system provide us with actionable insights, allowing us to continuously enhance our services. MediCal has transformed our practice from data-rich but insight-poor to one that leverages data for continuous improvement in both operations and patient care.",
    color: "bg-red-100",
  },
  {
    name: "Dr. Jassir Jonis",
    role: "Dentist",
    image: "/images/testimonial6.jpg",
    quote:
      "MediCal's integration with our dental imaging software has been nothing short of transformative for our practice. As a dentist, having immediate access to a patient's complete oral health history, including high-resolution images and 3D scans, all within the same platform where I manage appointments and treatment plans, has streamlined our workflow immensely. The system's ability to annotate images and share them easily with patients has greatly improved treatment acceptance rates. Patients can now visualize their dental issues and understand proposed treatments better. The periodontal charting feature is particularly impressive, allowing for quick and accurate documentation. Moreover, the recall system has boosted our patient retention rates significantly. But what I appreciate most is how MediCal has helped us go paperless. From digital consent forms to automated insurance claims, every aspect of our practice management has been simplified and made more efficient. It's a comprehensive solution that has elevated the standard of care we provide and the way we run our dental practice.",
    color: "bg-orange-100",
  },
];

const Testimonials = () => {
  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
              What Our Users Say
            </h1>
            <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
              Discover how MediCal is transforming healthcare practices across
              the country. Read in-depth testimonials from our satisfied users.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-lg overflow-hidden ${testimonial.color}`}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <Image
                        className="h-16 w-16 rounded-full mr-4 object-cover"
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="relative mt-4">
                      <Quote className="absolute top-0 left-0 text-emerald-500 h-8 w-8 -mt-3 -ml-3 opacity-25" />
                      <p className="text-gray-800 relative z-10 italic text-sm leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Testimonials;
