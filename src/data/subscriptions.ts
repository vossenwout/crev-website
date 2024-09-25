export type UsageLimits = {
  maxDailyReviews: number;
  maxInputTokens: number;
};

export type SubscriptionPlan = {
  id: SubscriptionID;
  name: string;
  price: number;
  usageLimits: UsageLimits;
  stripePriceId: string;
};

export const SubscriptionIDs = ["hobby", "premium", "pro"] as const;

export type SubscriptionID = (typeof SubscriptionIDs)[number];

// maps a role to a subscription plan
export const SubscriptionPlans: Record<SubscriptionID, SubscriptionPlan> = {
  hobby: {
    id: "hobby",
    name: "Hobby Plan",
    price: 9,
    usageLimits: {
      maxDailyReviews: 10,
      maxInputTokens: 50,
    },
    stripePriceId: process.env.NEXT_PUBLIC_HOBBY_PLAN_PRICE_ID as string,
  },
  premium: {
    id: "premium",
    name: "Premium Plan",
    price: 17,
    usageLimits: {
      maxDailyReviews: 25,
      maxInputTokens: 100,
    },
    stripePriceId: process.env.NEXT_PUBLIC_PREMIUM_PLAN_PRICE_ID as string,
  },
  pro: {
    id: "pro",
    name: "Pro Plan",
    price: 39,
    usageLimits: {
      maxDailyReviews: 60,
      maxInputTokens: 120,
    },
    stripePriceId: process.env.NEXT_PUBLIC_PRO_PLAN_PRICE_ID as string,
  },
};
