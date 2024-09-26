"use client";

import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/home" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="API Key" href="/api-key" active={false} />
          <ProfileButton />
        </div>
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-8 py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Questions?</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
          Contact: vossen.w@hotmail.com
        </p>
      </main>
    </div>
  );
}
