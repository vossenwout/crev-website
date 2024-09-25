"use client";

import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/home" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="Code Review API Key" href="/api-key" active={false} />
          <ProfileButton />
        </div>
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-8 py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to CREV</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
          Enhance your code quality with our code review cli tool. Get started by exploring the
          documentation or managing your API keys.
        </p>

        <div className="flex gap-6">
          <a
            href="/docs"
            className="px-8 py-4 bg-black text-white rounded-md text-lg font-medium hover:bg-gray-800 transition"
          >
            Read Documentation
          </a>
          <a
            href="/api-key"
            className="px-8 py-4 bg-gray-100 text-gray-800 rounded-md text-lg font-medium hover:bg-gray-200 transition"
          >
            Manage API Keys
          </a>
        </div>
      </main>

      {/* Github link */}
      <div className="flex flex-col items-center ">
        <a
          href="https://github.com/vossenwout/crev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            width={70}
            height={70}
          />
        </a>
        <p className="text-gray-600 mb-2">View source code on github</p>
      </div>
    </div>
  );
}
