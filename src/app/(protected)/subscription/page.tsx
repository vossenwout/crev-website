"use client";

import { auth } from "@/firebase/auth";
import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession, getCustomerPortal, getSubscriptionInfo } from "@/firebase/stripe";
import { SubscriptionID } from "@/data/subscriptions";
import { useRouter } from "next/navigation";
import { SubscriptionPlans } from "@/data/subscriptions";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";

export default function Subscription() {
  const [user] = useAuthState(auth);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [isLoadingUserSubscription, setIsLoadingUserSubscription] = useState(true);
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<SubscriptionID | null>(null);
  const router = useRouter();
  const plans = SubscriptionPlans;

  useEffect(() => {
    if (user) {
      getSubscriptionInfo(user.uid).then((subscriptionInfo) => {
        if (subscriptionInfo) {
          setCurrentSubscriptionId(subscriptionInfo.id);
        }
        setIsLoadingUserSubscription(false);
      });
    }
  }, [user]);

  const redirectToCheckout = async (uid: string, priceId: string) => {
    setStripeLoading(true);
    createCheckoutSession(uid, priceId);
  };
  // pricing plans same as in src/app/pricing/page.tsx
  const pricingPlansNoSubscription = [
    {
      title: plans.hobby.name,
      price: "$" + plans.hobby.price,
      features: [
        plans.hobby.usageLimits.maxDailyReviews + " Daily AI Reviews",
        plans.hobby.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
      ],
      buttonText: "Subscribe",
      buttonAction: () => user?.uid && redirectToCheckout(user.uid, plans.hobby.stripePriceId),
    },
    {
      title: plans.premium.name,
      price: "$" + plans.premium.price,
      features: [
        plans.premium.usageLimits.maxDailyReviews + " Daily AI Reviews",
        plans.premium.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
      ],
      buttonText: "Subscribe",
      buttonAction: () => user?.uid && redirectToCheckout(user.uid, plans.premium.stripePriceId),
      highlight: true, // Highlight this plan
      highlightText: "Most Popular",
    },
    {
      title: plans.pro.name,
      price: "$" + plans.pro.price,
      features: [
        plans.pro.usageLimits.maxDailyReviews + " Daily AI Reviews",
        plans.pro.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
        "Advanced Reasoning Model: GPT-o1-preview (COMING SOON)",
      ],
      buttonText: "Subscribe",
      buttonAction: () => user?.uid && redirectToCheckout(user.uid, plans.pro.stripePriceId),
    },
  ];

  const pricingPlansWithSubscription = [
    {
      title: plans.hobby.name,
      price: "$" + plans.hobby.price,
      features: [
        plans.hobby.usageLimits.maxDailyReviews + " Daily AI Reviews",
        plans.hobby.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
      ],
      buttonText: "Update plan",
      buttonAction: () => redirectToPortal(),
      highlight: currentSubscriptionId === plans.hobby.id, // Highlight this plan
      highlightText: "Current plan",
    },
    {
      title: plans.premium.name,
      price: "$" + plans.premium.price,
      features: [
        plans.premium.usageLimits.maxDailyReviews + " Daily AI Reviews",
        plans.premium.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
      ],
      buttonText: "Update plan",
      buttonAction: () => redirectToPortal(),
      highlight: currentSubscriptionId === plans.premium.id, // Highlight this plan
      highlightText: "Current Plan",
    },
    {
      title: plans.pro.name,
      price: "$" + plans.pro.price,
      features: [
        plans.pro.usageLimits.maxDailyReviews + " Daily AI Reviews",
        plans.pro.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
        "Advanced Reasoning Model: GPT-o1-preview (COMING SOON)",
      ],
      buttonText: "Update plan",
      buttonAction: () => redirectToPortal(),
      highlight: currentSubscriptionId === plans.pro.id, // Highlight this plan
      highlightText: "Current plan",
    },
  ];

  const redirectToPortal = async () => {
    setStripeLoading(true);
    getCustomerPortal();
  };

  if (stripeLoading) {
    {
      /* Load stripe because user clicked checkout or wants to go to customer portal */
    }
    return (
      <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
          <LogoButton title="CREV" href="/home" />
          <div className="flex gap-4">
            <NavigationButton title="Docs" href="/docs" active={false} />
            <NavigationButton title="API Key" href="/api-key" active={false} />
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
    if (isLoadingUserSubscription) {
      {
        /* Loading subscription */
      }
      return (
        <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
          <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
            <LogoButton title="CREV" href="/home" />
            <div className="flex gap-4">
              <NavigationButton title="Docs" href="/docs" active={false} />
              <NavigationButton title="API Key" href="/api-key" active={false} />
              <ProfileButton />
            </div>
          </div>
          <div className="flex items-center justify-center flex-col space-y-4 pb-10 pt-2 ">
            <h1 className="text-2xl font-bold">Manage Subscription Page</h1>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          </div>
        </div>
      );
    } else {
      {
        /* Active subscription*/
      }
      if (currentSubscriptionId) {
        return (
          <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
              <LogoButton title="CREV" href="/home" />
              <div className="flex gap-4">
                <NavigationButton title="Docs" href="/docs" active={false} />
                <NavigationButton title="API Key" href="/api-key" active={false} />
                <ProfileButton />
              </div>
            </div>
            <div className="flex items-center justify-center flex-col space-y-4 pb-10 pt-2 ">
              <h1 className="text-2xl font-bold">Manage your subscription</h1>
              {/* Pricing Cards */}
              <div className="text-center max-w-3xl mx-auto mb-8">
                <p className="text-lg text-gray-700">
                  Here you can upgrade / downgrade or cancel your current subscription.
                </p>
              </div>
              <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                {pricingPlansWithSubscription.map((plan, index) => (
                  <SubscriptionCard key={index} {...plan} />
                ))}
              </div>
            </div>
          </div>
        );
      } else {
        {
          /* No active subscription*/
        }
        return (
          <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
              <LogoButton title="CREV" href="/home" />
              <div className="flex gap-4">
                <NavigationButton title="Docs" href="/docs" active={false} />
                <NavigationButton title="API Key" href="/api-key" active={false} />
                <ProfileButton />
              </div>
            </div>
            <div className="flex items-center justify-center flex-col space-y-4 pb-10 pt-2 ">
              <h1 className="text-2xl font-bold">Choose your plan</h1>
              {/* Pricing Cards */}
              <div className="text-center max-w-3xl mx-auto mb-8">
                <p className="text-lg text-gray-700">
                  Bundling your code with the <strong>crev bundle</strong> command is completely
                  free! However, to run the <strong>crev review</strong> command and let an expert
                  coding AI review your code you can choose one of the following plans.
                </p>
              </div>
              <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                {pricingPlansNoSubscription.map((plan, index) => (
                  <SubscriptionCard key={index} {...plan} />
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}
