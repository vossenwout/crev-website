import { db } from "./config";
import { collection, doc, getDoc } from "firebase/firestore";

export const fetchApiKey = async (uid: string) => {
  try {
    const userCollection = collection(db, "users");
    const userDoc = doc(userCollection, uid);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
      const apiKey = userDocSnap.data().apiKey;
      if (apiKey) {
        return apiKey;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching API key:", error);
    return null;
  }
};
