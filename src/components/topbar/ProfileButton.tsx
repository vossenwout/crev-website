"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileButton() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleSubscription = () => {
    router.push("/subscription");
  };

  const handleContact = () => {
    router.push("/contact");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left h-max">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-black hover:bg-gray-200 focus:outline-none rounded-md py-2 px-4  border-gray-200 transition duration-300 ease-in-out"
      >
        <FaUserCircle size={28} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <button
            onClick={handleSubscription}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Subscription
          </button>
          <button
            onClick={handleContact}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Contact Us
          </button>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 "
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
