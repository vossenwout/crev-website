"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/auth";
import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import { generateApiKey } from "@/firebase/functions/generateAPIKey";
import { fetchApiKey } from "@/firebase/firestore";
import { getSubscriptionInfo } from "@/firebase/stripe";

export default function APIKey() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // Subscription and API key state
  const [isLoadingUserSubscription, setIsLoadingUserSubscription] = useState(true);
  const [userSubscription, setUserSubscription] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoadingApiKey, setIsLoadingApiKey] = useState(true);
  const [copySuccess, setCopySuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch subscription and API key on component mount
  useEffect(() => {
    if (user) {
      getSubscriptionInfo(user.uid).then((subscriptionInfo) => {
        if (subscriptionInfo) {
          setUserSubscription(subscriptionInfo.name);
        }
        setIsLoadingUserSubscription(false);
      });

      fetchApiKey(user.uid).then((apiKey) => {
        if (apiKey) {
          setApiKey(apiKey);
        }
        setIsLoadingApiKey(false);
      });
    }
  }, [user]);

  // Handle API key generation with confirmation
  const handleGenerateAPIKey = async () => {
    try {
      setApiKey("Generating...");
      const { apiKey } = await generateApiKey();
      setApiKey(apiKey);
      setCopySuccess("API Key Generated Successfully!");
      setTimeout(() => setCopySuccess(""), 3000);
    } catch (error) {
      setCopySuccess("Failed to Generate API Key.");
      setTimeout(() => setCopySuccess(""), 3000);
    } finally {
      setShowModal(false);
    }
  };

  // Handle API key copy to clipboard
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
    <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/home" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="API Key" href="/api-key" active={true} />
          <ProfileButton />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start mt-10 px-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Manage API Keys</h1>

        <div className="w-full max-w-4xl">
          {/* Subscription Status */}
          <section className="mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Subscription Status</h2>
              {isLoadingUserSubscription ? (
                <p className="text-gray-500">Loading subscription status...</p>
              ) : userSubscription ? (
                <p className="text-gray-700 text-base">
                  You have an active subscription:{" "}
                  <span className="font-medium">{userSubscription}</span>
                </p>
              ) : (
                <p className="text-gray-700 text-base">
                  You do not have an active subscription. Please purchase one to generate API keys.
                </p>
              )}
              <button
                onClick={() => router.push("/subscription")}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                {userSubscription ? "Manage Subscription" : "Purchase Subscription"}
              </button>
            </div>
          </section>

          {/* API Key Section */}
          {userSubscription && (
            <section className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Your API Key</h2>
                {isLoadingApiKey ? (
                  <p className="text-gray-500">Loading API key...</p>
                ) : apiKey === "" ? (
                  <p className="text-gray-700">No API key found. Please generate one.</p>
                ) : (
                  <div className="flex items-center bg-white border border-gray-300 rounded-md p-2">
                    <span className="flex-1 text-gray-800 break-all font-mono text-sm">
                      {apiKey}
                    </span>
                    <button
                      onClick={handleCopyAPIKey}
                      className="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 text-md leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Copy
                    </button>
                  </div>
                )}
                {copySuccess && (
                  <p
                    className={`mt-2 text-sm ${
                      copySuccess.includes("Failed") ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {copySuccess}
                  </p>
                )}
                {/* Generate API Key Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                >
                  Generate New API Key
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm API Key Regeneration</h3>
            <p className="text-gray-700 mb-6">
              Generating a new API key will{" "}
              <span className="font-semibold">revoke your previous key</span>. Do you wish to
              continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAPIKey}
                className="px-4 py-2 bg-red-600 text- font-medium text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
    </div>
  );
}
