"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
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
              Choose your favorite plan
            </h1>
            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
              {[
                {
                  name: "Basic",
                  price: "$9",
                  description: "Essential features for small practices",
                  icon: <Check className="h-6 w-6" />,
                  features: [
                    "1 User",
                    "Online Support",
                    "1000 Monthly Requests",
                    "1 GB Data Package",
                  ],
                  color: "bg-emerald-500",
                },
                {
                  name: "Advanced",
                  price: "$29",
                  description: "Advanced features for growing clinics",
                  icon: <Zap className="h-6 w-6" />,
                  features: [
                    "Up to 5 Users",
                    "Priority Support",
                    "5000 Monthly Requests",
                    "5 GB Data Package",
                  ],
                  color: "bg-purple-500",
                },
                {
                  name: "Premium",
                  price: "$59",
                  description: "Premium features for large hospitals",
                  icon: <Crown className="h-6 w-6" />,
                  features: [
                    "Unlimited Users",
                    "Premium Support",
                    "Unlimited Monthly Requests",
                    "10 GB Data Package",
                  ],
                  color: "bg-yellow-500",
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
                >
                  <div className="p-6">
                    <div
                      className={`inline-flex items-center justify-center p-2 ${tier.color} rounded-md shadow-lg`}
                    >
                      {tier.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-4">
                      {tier.name}
                    </h2>
                    <p className="mt-2 text-gray-500">{tier.description}</p>
                    <p className="mt-4">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {tier.price}
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mo
                      </span>
                    </p>
                    <Link href="/contactus">
                      <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700">
                        Select {tier.name}
                      </Button>
                    </Link>
                  </div>
                  <div className="pt-6 pb-8 px-6">
                    <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                      What's included
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
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

export default Pricing;
