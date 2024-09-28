"use client";

import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import LandingPageHeader from "@/components/topbar/LandingPageHeader";
import { SubscriptionPlans } from "@/data/subscriptions";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();
  const plans = SubscriptionPlans;

  const pricingPlans = [
    {
      title: plans.hobby.name,
      price: "$" + plans.hobby.price,
      features: [
        plans.hobby.usageLimits.maxDailyReviews + " Daily AI Code Reviews",
        plans.hobby.usageLimits.maxInputTokens + "k Input Tokens Limit / Review ",
      ],
      buttonText: "Get Started",
      buttonAction: () => router.push("/login"),
    },
    {
      title: plans.premium.name,
      price: "$" + plans.premium.price,
      features: [
        plans.premium.usageLimits.maxDailyReviews + " Daily AI Code Reviews",
        plans.premium.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
      ],
      buttonText: "Get Started",
      buttonAction: () => router.push("/login"),
      highlight: true, // Highlight this plan
      highlightText: "Most Popular",
    },
    {
      title: plans.pro.name,
      price: "$" + plans.pro.price,
      features: [
        plans.pro.usageLimits.maxDailyReviews + " Daily AI Code Reviews",
        plans.pro.usageLimits.maxInputTokens + "k Input Tokens Limit / Review",
        "Advanced Model: GPT-o1-preview  (COMING SOON) ",
      ],
      buttonText: "Get Started",
      buttonAction: () => router.push("/login"),
    },
  ];

  return (
    <div className=" p-3 min-h-screen font-[family-name:var(--font-geist-sans)]  ">
      <LandingPageHeader />

      {/* Bundling and Review Info */}
      <div className="text-center max-w-3xl mx-auto mt-8 mb-8">
        <p className="text-md text-gray-700">
          Bundling your code with the <strong>crev bundle</strong> command is completely free!
          However, to run the <strong>crev review</strong> command and let an expert coding AI
          review your code you can choose one of the following plans.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <SubscriptionCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
}
