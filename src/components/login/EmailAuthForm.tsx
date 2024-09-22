"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

interface EmailAuthFormProps {
  onSuccess: () => void;
}

export default function EmailAuthForm({ onSuccess }: EmailAuthFormProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter password
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // Check if the email is associated with an existing account
      // !! This requires Email Enumeration protection to be disabled in Firebase Auth settings !!
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        setIsExistingUser(true);
      } else {
        setIsExistingUser(false);
      }

      setStep(2); // Proceed to the password entry step
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  const handlePasswordSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isExistingUser) {
        // Sign in the existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create a new user account
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("Incorrect password. Please try again.");
        } else if (error.code === "auth/weak-password") {
          setErrorMessage("Password should be at least 6 characters.");
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {step === 1 && (
        <form
          onSubmit={handleEmailSubmit}
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-72 px-2 py-2 border border-gray-200 rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white w-72 px-2 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full flex flex-col items-center gap-4"
        >
          <p className="text-center">
            {isExistingUser
              ? "Welcome back! Please enter your password."
              : "Create a new account. Please set a password."}
          </p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-72 px-2 py-2 border border-gray-200 rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white w-72 px-2 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            {isExistingUser ? "Sign In" : "Sign Up"}
          </button>
        </form>
      )}

      {errorMessage && <p className="text-red-500">Error: {errorMessage}</p>}
    </div>
  );
}
