"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import LogoButton from "@/components/topbar/LogoButton";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        router.push("/home");
      } else {
        router.push("/email-verification");
      }
    }
  }, [user, router]);

  return (
    <div className=" p-3 min-h-screen font-[family-name:var(--font-geist-sans)]  ">
      <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/" />
      </div>
      {!loading && !user && (
        <div className="flex flex-col items-center justify-center pt-5">
          <h1 className="text-4xl font-bold mb-4 pb-5">Log In / Sign Up</h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={signInWithGoogle}
              className="bg-white text-black w-72 justify-center px-2 py-2 rounded-md flex items-center border border-gray-200 hover:bg-gray-100 focus:outline-none"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google logo"
                className="w-6 h-6 mr-2"
              />
              Continue with Google
            </button>
            <button
              onClick={() => router.push("/login/email")}
              className="bg-white text-black w-72 justify-center px-2 py-2 rounded-md flex items-center border border-gray-200 hover:bg-gray-100 focus:outline-none"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Envelope_font_awesome.svg"
                alt="Email logo"
                className="w-6 h-6 mr-2"
              />
              Continue with Email
            </button>
            {error && <p>Error: {error.message}</p>}
          </div>
        </div>
      )}

      <div className="flex items-center  justify-center flex-col  space-y-4 pb-10 pt-2  font-[family-name:var(--font-geist-mono)]"></div>
    </div>
  );
}
