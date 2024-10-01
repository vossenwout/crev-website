"use client";

import LandingPageHeader from "@/components/topbar/LandingPageHeader";
import FeaturesSection from "@/components/landing-page/FeaturesSelection";
import CallToActionBig from "@/components/landing-page/CallToActionBig";
import Footer from "@/components/landing-page/Footer";
import MainFeatures from "@/components/landing-page/MainFeatures";
import CallToActionSmall from "@/components/landing-page/CallToActionSmall";

export default function Home() {
  return (
    <div className="p-3 min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      {/* Header */}
      <LandingPageHeader />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-8 space-y-12 ">
        {/* Hero Section */}
        <section className="text-center max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-4">CLI Tool For AI Code Reviews</h1>
          <p className="text-lg text-gray-700">
            Harness the power of AI to improve your code quality, catch bugs and become a better
            software engineer straight from your terminal.
          </p>
        </section>

        {/* Features Section 1 */}
        <MainFeatures />

        {/* Call to action 1*/}
        <CallToActionSmall />
        {/* Features Section 2*/}
        <FeaturesSection />
      </main>
      {/* Call to action 2 */}
      <CallToActionBig />
      {/* Footer */}
      <Footer />
    </div>
  );
}
