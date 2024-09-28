"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoButton from "@/components/topbar/LogoButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import { CiMenuBurger as MenuIcon } from "react-icons/ci";
import { IoIosClose as XIcon } from "react-icons/io";

export default function LandingPageHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Header */}
      <header className="pl-2 pr-2 flex justify-between items-center border-b border-gray-100 pb-2 h-14">
        {/* Logo */}
        <LogoButton title="CREV" href="/" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="Pricing" href="/pricing" active={false} />
          <button
            onClick={() => router.push("/login")}
            className="text-white bg-black hover:bg-gray-800 focus:outline-none rounded-lg py-2 px-4"
          >
            Sign in
          </button>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200">
          <LogoButton title="CREV" href="/" />
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="Pricing" href="/pricing" active={false} />
          <button
            onClick={() => {
              router.push("/login");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-white bg-black hover:bg-gray-800 focus:outline-none rounded-lg py-2 px-4"
          >
            Sign in
          </button>
        </nav>
      </div>
    </>
  );
}
