"use client";

import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import LogoButton from "@/components/topbar/LogoButton";
import NavigationButton from "@/components/topbar/NavigationButton";
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
        plans.hobby.usageLimits.maxInputTokens +
          "k Input Tokens Limit / Review ",
      ],
      buttonText: "Get Started",
      buttonAction: () => router.push("/login"),
    },
    {
      title: plans.premium.name,
      price: "$" + plans.premium.price,
      features: [
        plans.premium.usageLimits.maxDailyReviews + " Daily AI Code Reviews",
        plans.premium.usageLimits.maxInputTokens +
          "k Input Tokens Limit / Review",
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
      <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="Pricing" href="/pricing" active={false} />
          <button
            onClick={() => router.push("login")}
            className="text-white bg-black hover:bg-gray-800 focus:outline-none rounded-lg py-2 px-4"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Bundling and Review Info */}
      <div className="text-center max-w-3xl mx-auto mt-8 mb-8">
        <p className="text-md text-gray-700">
          Bundling your code with the <strong>crev bundle</strong> command is
          completely free! However, to run the <strong>crev review</strong>{" "}
          command and let an expert coding AI review your code you can choose
          one of the following plans.
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
