"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoButton from "@/components/topbar/LogoButton";
import NavigationButton from "@/components/topbar/NavigationButton";

export default function Home() {
  const router = useRouter();

  return (
    <div className=" p-3 min-h-screen font-[family-name:var(--font-geist-sans)]  ">
      <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
        <LogoButton title="CREV" href="/" />
        <div className="flex gap-4">
          <NavigationButton title="Docs" href="/docs" active={false} />
          <NavigationButton title="Pricing" href="/pricing" active={false} />
          <button
            onClick={() => router.push("/login")}
            className="text-white bg-black hover:bg-gray-800 focus:outline-none rounded-lg py-2 px-4"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">
            CLI Tool For AI Code Reviews
          </h1>
          <p className="text-lg text-gray-700">
            Harness the power of AI to improve your code quality and catch bugs
            early.
          </p>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-4xl space-y-16">
          {/* Feature 1: Bundle Your Codebase */}
          <div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-md">
            {/* Text Content */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-3">
                Bundle Your Codebase
              </h2>
              <p className="text-gray-600 mb-6">
                Consolidate your entire codebase into a single, manageable file
                effortlessly.
              </p>
              <div className="flex justify-start w-full md:w-auto">
                <pre className="bg-black text-white p-3 rounded-md font-mono text-sm inline-block w-auto max-w-xs mb-6">
                  $ crev bundle
                </pre>
              </div>
            </div>
            {/* Image */}
            <div className="md:w-1/2">
              <Image
                src="/images/project.png"
                alt="Bundle your codebase"
                width={400}
                height={200}
                className="rounded-md shadow-lg"
              />
            </div>
          </div>

          {/* Feature 2: AI-Powered Code Reviews */}
          <div className="flex flex-col items-start bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">
              AI-Powered Code Reviews
            </h2>
            <p className="text-gray-600 mb-6">
              Receive comprehensive AI-driven code reviews to improve code
              quality and maintainability.
            </p>
            <pre className="bg-black text-white p-3 rounded-md font-mono text-sm mb-6">
              $ crev review
            </pre>
            <Image
              src="/images/example-code-review.png"
              alt="AI Code Review"
              width={800}
              height={400}
              className="rounded-md shadow-lg w-full object-cover"
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <p className="text-lg mb-4">
            Interested in improving your code quality?
          </p>
          <button
            onClick={() => router.push("/docs")}
            className="px-6 py-3 bg-black text-white rounded-lg transition-colors duration-200 hover:bg-gray-800"
          >
            Get Started
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-300 py-6">
        <div className="flex flex-col items-center space-y-4">
          <a
            href="https://github.com/vossenwout/crev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              width={40}
              height={40}
            />
          </a>
          <p className="text-sm text-gray-600">Contact: vossen.w@hotmail.com</p>
        </div>
      </footer>
    </div>
  );
}
