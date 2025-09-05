"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 
      w-[95%] md:w-[90%] 
      ${isScrolled ? "shadow-lg" : "shadow-md"}
      bg-white rounded-full px-6 py-3`}
    >
      <div className="flex justify-between items-center">
        {/* Logo (Now Text Only) */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-gray-900 tracking-wide">
            LocalAutoSpa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 relative">
          <Link
            href="/"
            className="font-medium text-gray-800 hover:text-black transition-colors"
          >
            Home
          </Link>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center font-medium text-gray-800 hover:text-black transition-colors">
              Services <ChevronDown size={16} className="ml-1" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-100 border border-gray-200 rounded-md shadow-lg z-50">
                <Link
                  href="/services/exterior"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                >
                  Exterior Wash
                </Link>
                <Link
                  href="/services/interior"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                >
                  Interior Cleaning
                </Link>
                <Link
                  href="/services/detailing"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                >
                  Full Detailing
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="font-medium text-gray-800 hover:text-black transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-medium text-gray-800 hover:text-black transition-colors"
          >
            Contact
          </Link>
          <Link href="/booking">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 p-2"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
