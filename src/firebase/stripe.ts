import { SubscriptionID } from "@/data/subscriptions";
import { db, functions } from "./config";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

export const createCheckoutSession = async (uid: string, priceId: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "customers", uid, "checkout_sessions"),
    {
      price: priceId,
      success_url: process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_URL,
      cancel_url: process.env.NEXT_PUBLIC_CHECKOUT_CANCEL_URL,
    }
  );
  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(
    doc(db, "customers", uid, "checkout_sessions", checkoutSessionRef.id),
    async (snap) => {
      const data = snap.data();
      if (data) {
        const { error, url } = data;
        if (url) {
          window.location.assign(url);
        } else if (error) {
          // No session, let's display the error message
          alert(`An error occured: ${error.message}`);
        }
      }
    }
  );
};

export const getCustomerPortal = async () => {
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );
  const { data } = await functionRef({
    returnUrl: process.env.NEXT_PUBLIC_PORTAL_RETURN_URL,
    locale: "auto",
  });
  const portalData = data as { url: string };
  window.location.assign(portalData.url);
};

export const getSubscriptionInfo = async (uid: string) => {
  try {
    // Reference to the subscriptions collection for the given user
    const collectionRef = collection(db, "customers", uid, "subscriptions");

    // Query for subscriptions with "trialing" or "active" status
    const querySnapshot = await getDocs(
      query(collectionRef, where("status", "in", ["trialing", "active"]))
    );

    // Extract the subscriptions
    const subscriptions = querySnapshot.docs.map((doc) => doc.data());

    if (subscriptions.length === 0) {
      // No active subscriptions found
      return null;
    }

    // Fetch the price for each subscription
    const subscriptionWithPrices = await Promise.all(
      subscriptions.map(async (subscription) => {
        // Handle cases where 'subscription.price' is undefined or invalid
        if (!subscription.price) {
          return { ...subscription, priceAmount: 0 };
        }

        const priceDoc = await getDoc(subscription.price);
        if (priceDoc.exists()) {
          const priceData = priceDoc.data() as { unit_amount: number };
          return { ...subscription, priceAmount: priceData.unit_amount }; // Assuming 'unit_amount' stores the price in cents
        } else {
          return { ...subscription, priceAmount: 0 }; // Default to 0 if price not found
        }
      })
    );

    // Sort the subscriptions by priceAmount in descending order (most expensive first)
    const sortedSubscriptions = subscriptionWithPrices.sort(
      (a, b) => b.priceAmount - a.priceAmount
    );

    console.log("Sorted subscriptions:", sortedSubscriptions);
    const mostExpensiveSubscription = sortedSubscriptions[0] as {
      priceAmount: number;
      role: SubscriptionID;
    };
    // Return the most expensive subscription
    return mostExpensiveSubscription;
  } catch (error) {
    // Log errors appropriately
    console.error("Error getting subscription info:", error);
    return null;
  }
};
