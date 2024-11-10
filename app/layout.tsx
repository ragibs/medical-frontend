import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AppWrapper } from "@/app/context";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MediCal",
  description:
    "SaaS solution for appointment booking, patient and doctor management.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-chiffon`}>
        <AppWrapper>
          {children}
          <Toaster />
        </AppWrapper>
      </body>
    </html>
  );
}
