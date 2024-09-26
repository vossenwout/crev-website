"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function EmailVerificationPage() {
  const [user] = useAuthState(auth);
  const [notification, setNotification] = useState("");
  const router = useRouter();

  // Check if the user has verified their email every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      user?.reload().then(() => {
        if (user?.emailVerified) {
          router.push("/home");
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [user, router]);

  const resendVerificationEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setNotification("A new verification email has been sent to your inbox.");
      } catch (error) {
        setNotification(
          "Sorry, we couldn't resend the verification email. Please try again later."
        );
      }
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Verify Your Email</h1>
        <p className="mt-4 text-gray-600">
          We've sent a verification email to the following address:
        </p>

        <div className="mt-2 mb-4 flex items-center justify-center ">
          <p className="text-lg font-medium text-gray-900 break-words">{user?.email}</p>
        </div>

        <p className="text-gray-600">
          Please check your inbox (and spam) then click the verification link to activate your
          account.
        </p>

        {notification && (
          <div className="mt-6 p-4 rounded-md bg-green-50 border border-green-200">
            <p className="text-sm text-green-700">{notification}</p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <button
            onClick={resendVerificationEmail}
            className="w-full flex items-center justify-center px-4 py-2 text-md font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Resend Verification Email
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center px-4 py-2 text-md font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 flex items-start bg-blue-50 p-4 rounded-lg">
          <svg
            className="w-6 h-6 text-blue-500 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 12h2V7H9v5zM10 14a1 1 0 110 2 1 1 0 010-2zm8-4a8 8 0 11-16 0 8 8 0 0116 0z" />
          </svg>
          <p className="ml-3 text-sm text-blue-700">
            <strong>Important:</strong> If you don't see the email, please check your spam or junk
            folder.
          </p>
        </div>
      </div>
    </main>
  );
}
