import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./config";

export const auth = getAuth(app);

// set up Google authentication
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
};
