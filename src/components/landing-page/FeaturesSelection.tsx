import { FaTerminal, FaBrain, FaArchive, FaRocket } from "react-icons/fa";

export default function FeaturesSection() {
  return (
    <section className="bg-white py-3 pb-14" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-black">
            Become a better software engineer with Crev
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Discover how Crev can help you writing better code.
          </p>
        </div>
        {/* Features Grid */}
        <div className="mt-16">
          <dl className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-16">
            {/* Feature 1 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaTerminal className="h-6 w-6" />
                </div>
                <p className="ml-16 text-xl leading-7 font-semibold text-black">
                  Seamless CLI Integration
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-600">
                Get AI code reviews without leaving your terminal. Crev integrates directly with
                your CLI for a seamless experience.
              </dd>
            </div>
            {/* Feature 2 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaBrain className="h-6 w-6" />
                </div>
                <p className="ml-16 text-xl leading-7 font-semibold text-black">
                  Improve Your Coding Skills
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-600">
                Get instant feedback on your code quality, performance, and security from the best
                AI models through comprehensive code reviews.
              </dd>
            </div>
            {/* Feature 3 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaArchive className="h-6 w-6" />
                </div>
                <p className="ml-16 text-xl leading-7 font-semibold text-black">
                  Bundle Your Codebase
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-600">
                Consolidate your entire codebase and directory structure into a single file to
                simplify sharing it with AI models.
              </dd>
            </div>
            {/* Feature 4 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaRocket className="h-6 w-6" />
                </div>
                <p className="ml-16 text-xl leading-7 font-semibold text-black">
                  Fast and Cross-Platform
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-600">
                Crev is written in Golang, making it fast, efficient, and natively cross-platform.
                Get code reviews on Windows, Mac, or Linux.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
