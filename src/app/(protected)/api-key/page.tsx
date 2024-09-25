"use client";

import { auth } from "@/firebase/auth";
import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { generateApiKey } from "@/firebase/functions/generateAPIKey";
import { fetchApiKey } from "@/firebase/firestore";
import { getSubscriptionInfo } from "@/firebase/stripe";

export default function APIKey() {
  const [user] = useAuthState(auth);
  // load user subscription status
  const [isLoadingUserSubscription, setIsLoadingUserSubscription] = useState(true);
  const [userSubscription, setUserSubscription] = useState<string | null>(null);
  // load currently assigned api key
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoadingApiKey, setIsLoadingApiKey] = useState(true);
  // check if all user info is loaded this component requires
  const [copySuccess, setCopySuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getSubscriptionInfo(user.uid).then((subscriptionInfo) => {
        if (subscriptionInfo) {
          setUserSubscription(subscriptionInfo.name);
        }
        setIsLoadingUserSubscription(false);
      });
      // Fetch API key
      fetchApiKey(user.uid).then((apiKey) => {
        if (apiKey) {
          setApiKey(apiKey);
        }
        setIsLoadingApiKey(false);
      });
    }
  }, [user]);

  const handleGenerateAPIKey = async () => {
    try {
      const { apiKey } = await generateApiKey();
      setApiKey(apiKey);
      setCopySuccess("API Key Generated Successfully!");
      setTimeout(() => setCopySuccess(""), 3000);
    } catch (error) {
      setCopySuccess("Failed to Generate API Key.");
      setTimeout(() => setCopySuccess(""), 3000);
    }
  };

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText(apiKey).then(
      () => {
        setCopySuccess("API Key Copied to Clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      },
      () => {
        setCopySuccess("Failed to Copy API Key.");
        setTimeout(() => setCopySuccess(""), 3000);
      }
    );
  };

  return (
    <div className=" p-3 min-h-screen font-[family-name:var(--font-geist-sans)]  ">
      {/* Top Header */}
      <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/home" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="Code Review API Key" href="/api-key" active={true} />
          <ProfileButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">API Keys Management</h1>
        <p className="text-gray-600 mb-6">
          You need an active subscription to generate API keys which grant usage according to your
          chosen plan.
        </p>

        {/* Subscription Status */}
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Subscription Status</h2>
          {isLoadingUserSubscription ? (
            <p className="text-gray-500">Loading subscription status...</p>
          ) : userSubscription ? (
            <p className="text-green-600">Active Subscription: {userSubscription}</p>
          ) : (
            <p className="text-red-600">
              No active subscription. Please purchase one to generate API keys.
            </p>
          )}
        </div>

        {/* Manage/Update Subscription Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/subscription")}
            className="w-full bg-gray-500 text-white px-4 py-3 rounded-md hover:bg-gray-600 transition duration-200"
          >
            {userSubscription ? "Manage Subscription" : "Purchase Subscription"}
          </button>
        </div>
        {/* Conditionally Render API Key Section */}
        {userSubscription && (
          <>
            {/* Current API Key */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-700 mb-2">Current API Key</h2>
              <div className="flex items-center bg-gray-100 p-4 rounded-md">
                {isLoadingApiKey ? (
                  <p className="text-gray-500 mt-2">Loading API key...</p>
                ) : apiKey === "" ? (
                  <p className="text-red-600 mt-2">No API key found. Please generate one.</p>
                ) : (
                  <span className="flex-1 text-gray-800 break-all">{apiKey}</span>
                )}
                {!isLoadingApiKey && apiKey !== "" && (
                  <button
                    onClick={handleCopyAPIKey}
                    className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-md transition duration-200"
                  >
                    Copy
                  </button>
                )}
              </div>

              {copySuccess && (
                <p
                  className={`mt-2 ${
                    copySuccess.includes("Failed") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {copySuccess}
                </p>
              )}
            </div>

            {/* Generate API Key */}
            <div className="mb-6">
              <button
                onClick={handleGenerateAPIKey}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-md transition duration-200"
              >
                Generate New API Key
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
