export type UsageLimits = {
  maxDailyReviews: number;
};

export type SubscriptionPlan = {
  id: SubscriptionID;
  name: string;
  price: number;
  usageLimits: UsageLimits;
};

export const SubscriptionIDs = ["test", "pro", "enterprise"] as const;

export type SubscriptionID = (typeof SubscriptionIDs)[number];
