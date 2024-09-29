"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

export default function EmailAuthForm() {
  const [currentStep, setCurrentStep] = useState<
    "selection" | "signIn" | "signUp" | "forgotPassword"
  >("selection");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (currentStep === "signIn") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
      } else if (currentStep === "signUp") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
      } else if (currentStep === "forgotPassword") {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage(
          "A password reset email has been sent to your email address. Please also check spam folder."
        );
        setCurrentStep("signIn");
      }
    } catch (error: any) {
      setSuccessMessage("");
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMessage("Incorrect email or password.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password should be at least 6 characters.");
          break;
        case "auth/too-many-requests":
          setErrorMessage("Too many attempts. Please try again later.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email address.");
          break;
        default:
          setErrorMessage("An error occurred. Please try again.");
          break;
      }
    }
  };

  const renderSelection = () => (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Welcome</h2>
      <p className="text-gray-600">Please choose an option to continue:</p>
      <div className="flex flex-col gap-2 w-72">
        <button
          onClick={() => {
            setCurrentStep("signIn");
            setErrorMessage("");
            setSuccessMessage("");
          }}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setCurrentStep("signUp");
            setErrorMessage("");
            setSuccessMessage("");
          }}
          className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            setCurrentStep("forgotPassword");
            setErrorMessage("");
            setSuccessMessage("");
          }}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleAuth} className="w-full flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">
        {currentStep === "signIn" && "Sign In"}
        {currentStep === "signUp" && "Create Account"}
        {currentStep === "forgotPassword" && "Reset Password"}
      </h2>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-72 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      {(currentStep === "signIn" || currentStep === "signUp") && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-72 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}
      <button
        type="submit"
        className="bg-black text-white w-72 px-3 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
      >
        {currentStep === "signIn" && "Sign In"}
        {currentStep === "signUp" && "Sign Up"}
        {currentStep === "forgotPassword" && "Send Reset Email"}
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrentStep("selection");
          setErrorMessage("");
          setSuccessMessage("");
        }}
        className="text-blue-600 hover:underline focus:outline-none mt-2"
      >
        Back
      </button>
    </form>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        {currentStep === "selection" ? renderSelection() : renderForm()}
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      </div>
    </div>
  );
}
