"use client";

import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";

export default function Home() {
  return (
    <div className=" p-3 min-h-screen font-[family-name:var(--font-geist-sans)]  ">
      <div className="flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/home" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton
            title="Code Review API Key"
            href="/api-key"
            active={false}
          />
          <ProfileButton />
        </div>
      </div>

      <div className="flex items-center  justify-center flex-col  space-y-4 pb-10 pt-2  font-[family-name:var(--font-geist-mono)]">
        LOGGED IN
      </div>
    </div>
  );
}
