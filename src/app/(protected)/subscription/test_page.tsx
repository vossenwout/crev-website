"use client";

import { auth } from "@/firebase/auth";
import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import { useEffect, useState } from "react";
import { addUserDocument } from "@/firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession, getCustomerPortal } from "@/firebase/stripe";

export default function Subscription() {
  const [documentLoading, setDocumentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // in the layout.tsx we are already checking if the user is authenticated
  const [user] = useAuthState(auth);
  const [stripeLoading, setStripeLoading] = useState(false);
  // add loading until we get the claims

  useEffect(() => {
    if (user) {
      console.log("User is authenticated:", user);
      user.getIdTokenResult().then((idTokenResult) => {
        console.log("User claims:", idTokenResult.claims);
      });
    }
  }, [user]);

  const handleDummyWrite = async (uid: string) => {
    setDocumentLoading(true);
    setError(null);
    try {
      const dummy_data = {
        name: "Dummy das",
        createdAt: new Date(),
      };
      await addUserDocument(uid, dummy_data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setDocumentLoading(false);
    }
  };

  const handleDummyCheckout = async () => {
    if (user) {
      setStripeLoading(true);
      createCheckoutSession(user.uid, "price_1Q0TGCLMFFF2hVk55ewoDsHa");
    }
  };

  const handleDummyPortal = async () => {
    if (user) {
      setStripeLoading(true);
      getCustomerPortal();
    }
  };

  if (stripeLoading) {
    return (
      <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
          <LogoButton title="CREV" href="/home" />
          <div className="flex gap-4">
            <NavigationButton title="Docs" href="/docs" active={false} />
            <NavigationButton
              title="Code Review API Key"
              href="/api-key"
              active={false}
            />
            <ProfileButton />
          </div>
        </div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-white rounded-lg shadow-lg">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
            <p className="text-lg text-gray-800 font-semibold">
              Loading payment processor, please wait...
            </p>
            <p className="text-sm text-gray-500">
              You will be redirected to a Stripe page shortly.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
          <LogoButton title="CREV" href="/home" />
          <div className="flex gap-4">
            <NavigationButton title="Docs" href="/docs" active={false} />
            <NavigationButton
              title="Code Review API Key"
              href="/api-key"
              active={false}
            />
            <ProfileButton />
          </div>
        </div>
        <div className="flex items-center justify-center flex-col space-y-4 pb-10 pt-2 ">
          <h1 className="text-2xl font-bold">Manage Subscription Page</h1>
          <button
            onClick={() => user?.uid && handleDummyWrite(user.uid)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={documentLoading}
          >
            {documentLoading ? "Writing..." : "Dummy write"}
          </button>

          <button
            onClick={() => handleDummyCheckout()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={documentLoading}
          >
            {documentLoading ? "Writing..." : "Buy subscription"}
          </button>

          <button
            onClick={() => handleDummyPortal()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={documentLoading}
          >
            {documentLoading ? "Writing..." : "Open Customer Portal"}
          </button>
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>
      </div>
    );
  }
}
