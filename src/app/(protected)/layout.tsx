"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectLayout({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // protect the api-key route
  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/login");
      } else if (!user.emailVerified) {
        // Redirect to email verification page if email is not verified
        router.push("/email-verification");
      }
    }
  }, [user, loading, router]);

  if (loading || !user || !user.emailVerified) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-800"></div>
      </div>
    );
  } else {
    // Render the page for authenticated users
    return <div>{children}</div>;
  }
}
