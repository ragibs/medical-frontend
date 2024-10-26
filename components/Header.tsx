"use client";

import { useState } from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-50 bg-chiffon">
        <div className="flex items-center space-x-2">
          <Image src={logo} width={60} alt={"Logo of medical"} />
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-tangerine">
            Home
          </Link>
          <Link href="/features" className="hover:text-tangerine">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-tangerine">
            Pricing
          </Link>
          <Link href="/testimonials" className="hover:text-tangerine">
            Testimonials
          </Link>
        </nav>
        <div className="hidden md:block">
          <Button className="bg-tangerine text-white hover:bg-salmon">
            Try Now
          </Button>
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-gradient-to-b from-chiffon to-gray-100 shadow-md z-40">
          <nav className="flex flex-col items-center py-4">
            <Link href="/" className="py-2 hover:text-tangerine">
              Home
            </Link>
            <Link href="/features" className="py-2 hover:text-tangerine">
              Features
            </Link>
            <Link href="/pricing" className="py-2 hover:text-tangerine">
              Pricing
            </Link>
            <Link href="/testimonials" className="py-2 hover:text-tangerine">
              Testimonials
            </Link>
            <Button className="mt-4 bg-tangerine text-white hover:bg-salmon">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
