"use client";

import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import EmailAuthForm from "@/components/login/EmailAuthForm";

export default function EmailLoginPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <div className="flex justify-center items-center gap-10">
          <h1
            className="text-3xl font-extrabold cursor-pointer hover:underline"
            onClick={() => router.push("/")}
          >
            CREV
          </h1>
        </div>
      </div>
      {!loading && !user && (
        <div className="flex flex-col items-center justify-center pt-5">
          <h1 className="text-4xl font-bold mb-4 pb-5">Continue with Email</h1>
          <EmailAuthForm
            onSuccess={() => {
              router.push("/home");
            }}
          />
        </div>
      )}
    </div>
  );
}
