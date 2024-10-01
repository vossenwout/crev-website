"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth";
import ProfileButton from "@/components/topbar/ProfileButton";
import NavigationButton from "@/components/topbar/NavigationButton";
import LogoButton from "@/components/topbar/LogoButton";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import LandingPageHeader from "@/components/topbar/LandingPageHeader";

export default function Docs() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-800"></div>
      </div>
    );
  }
  return (
    <div className=" p-3 min-h-screen font-[family-name:var(--font-geist-sans)]  ">
      {/* Header */}
      {user ? (
        <div className="pl-2 pr-2 flex justify-between border-b-gray-100 pb-2 border-b-2 h-14">
          <LogoButton title="CREV" href="/home" />
          <div className="flex gap-4">
            <NavigationButton title="Docs" href="/docs" active={true} />
            <NavigationButton title="API Key" href="/api-key" active={false} />
            <ProfileButton />
          </div>
        </div>
      ) : (
        <LandingPageHeader />
      )}

      {/* Main Content */}
      <main className="mt-10 space-y-12 pl-4 pr-4">
        {/* Explanation Section */}
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">What is crev?</h1>
          <p className="text-gray-700 text-md">
            Crev is an <strong>open-source </strong> command-line tool that allows you to easily{" "}
            <strong>bundle your codebase</strong> into a single file so you can share it with an AI.
            Crev also provides an <strong>AI code review service</strong> that provides feedback on
            this bundled file to catch bugs early and help you become a better software engineer.
          </p>
        </section>
        {/* Installation Section */}
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How to Install</h1>

          {/* Homebrew Installation */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              <a
                href="https://brew.sh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Homebrew (Linux/Mac)
              </a>
            </h2>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              brew install vossenwout/crev/crev
            </pre>
          </div>

          {/* Scoop Installation */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              <a
                href="https://scoop.sh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Scoop (Windows)
              </a>
            </h2>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto mb-2">
              scoop bucket add crev https://github.com/vossenwout/scoop-crev
            </pre>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              scoop install crev
            </pre>
          </div>

          {/* Binary Installation */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              <a
                href="https://github.com/vossenwout/crev/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Binaries
              </a>
            </h2>
            <p className="text-gray-700">
              Download the latest release from GitHub{" "}
              <a
                href="https://github.com/vossenwout/crev/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                here
              </a>{" "}
              and manually update your PATH variable.
            </p>
            <p className="text-gray-700 mb-2">
              Or use the following scripts to install the latest version:
            </p>
          </div>

          {/* Installation Scripts */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Linux/Mac Installation Script
            </h3>
            <p className="text-gray-700 mb-2">
              Execute the following in your terminal (<strong>requires sudo</strong>):
            </p>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              sudo curl -L https://raw.githubusercontent.com/vossenwout/crev/main/scripts/install.sh
              | bash
            </pre>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Windows Installation Script
            </h3>
            <p className="text-gray-700 mb-2">
              Invoke this in a PowerShell you opened with <strong>admin rights</strong>:
            </p>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              Invoke-Expression (Invoke-WebRequest -Uri
              &apos;https://raw.githubusercontent.com/vossenwout/crev/main/scripts/install.ps1&apos;).Content
            </pre>
          </div>
        </section>

        {/* Commands Section */}
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Commands</h1>

          {/* Initialize Config */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              (Optional) Initialize Config
            </h2>
            <p className="text-gray-700 mb-4">
              Creates a <code className="bg-gray-200 px-1 rounded">.crev-config.yaml</code> file in
              the current directory, allowing you to configure the Crev tool. This way you
              don&apos;t have to pass flags every time you run a command.
            </p>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              crev init
            </pre>
          </div>

          {/* Bundle Command */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bundle Your Codebase</h2>
            <p className="text-gray-700 mb-4">
              This command bundles your entire project, starting from the directory where it&apos;s
              executed, into a single file named{" "}
              <code className="bg-gray-200 px-1 rounded">crev-project.txt</code>.
            </p>

            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              crev bundle
            </pre>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold text-red-600">Note:</span> By default a lot of common
              configuration files like (.gitignore, package.json, Dockerfile, ...) and non-text
              files (.jpeg, .pdf, .gif, ...) are excluded.
            </p>

            {/* Flags */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-2">Flags:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <span className="font-medium">--ignore-ext</span> - Exclude specific file
                  extensions.
                  <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm mt-2 overflow-x-auto">
                    crev bundle --ignore-ext=.txt,.md
                  </pre>
                </li>
                <li>
                  <span className="font-medium">--ignore-pre</span> - Exclude files or directories
                  by prefix.
                  <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm mt-2 overflow-x-auto">
                    crev bundle --ignore-pre=tests,readme
                  </pre>
                </li>
                <li>
                  <span className="font-medium">--include-ext</span> - Only include specified file
                  extensions.
                  <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm mt-2 overflow-x-auto">
                    crev bundle --include-ext=.js,.ts
                  </pre>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold text-red-600">Note:</span> It can be helpful to set up
              a <code className="bg-gray-200 px-1 rounded">.crev-config.yaml</code> by running{" "}
              <strong> crev init</strong> so you don&apos;t have to pass these flags every time.
            </p>
          </div>

          {/* Review Command */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get an AI Code Review</h2>
            <p className="text-gray-700 mb-4">
              Let an AI review your bundled project file. The review will be saved into a file{" "}
              <code className="bg-gray-200 px-1 rounded">crev-review.md</code>. Requires a Crev API
              key which you can generate{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => router.push("/api-key")}
              >
                here
              </button>
              .
            </p>
            <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
              crev review
            </pre>
          </div>
        </section>

        {/* API Key Section */}
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How to Use the Crev API Key</h1>

          {/* Explanation */}
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              To run the <strong>crev review</strong> command and let an expert coding AI review
              your code, you need to generate a <strong>Crev API key</strong>, which you can do{" "}
              <a
                href="/api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                here
              </a>
              .
            </p>
            <p className="text-gray-700">
              Afterward, set the API key in your environment using one of the following options:
            </p>
          </div>

          {/* API Key Options */}
          <div className="space-y-12">
            {/* Option 1: Environment Variable */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Option 1: Set as Environment Variable (Recommended)
              </h2>
              <p className="text-gray-700 mb-4">
                Setting the API key as an environment variable ensures you only need to set it once.
              </p>

              {/* Linux/Mac */}
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Linux/Mac</h3>
                <p className="text-gray-600 mb-2">Add the API key to your shell configuration:</p>
                <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
                  nano ~/.bashrc
                </pre>
                <p className="text-gray-600 mt-2 mb-2">If using zsh shell (common on Mac):</p>
                <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
                  nano ~/.zshrc
                </pre>
                <p className="text-gray-600 mt-2 mb-2">
                  Add the following line at the end of the file:
                </p>
                <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
                  export CREV_API_KEY=&quot;REPLACE_WITH_YOUR_API_KEY&quot;
                </pre>
                <p className="text-gray-600 mt-2">
                  Save the file and restart your terminal to apply the changes.
                </p>
              </div>

              {/* Windows */}
              <div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Windows (PowerShell)</h3>
                <p className="text-gray-600 mb-2">
                  Set the API key environment variable directly using PowerShell:
                </p>
                <pre className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm overflow-x-auto">
                  [System.Environment]::SetEnvironmentVariable(&quot;CREV_API_KEY&quot;,
                  &quot;REPLACE_WITH_YOUR_API_KEY&quot;, &quot;User&quot;)
                </pre>
                <p className="text-gray-600 mt-2">Restart PowerShell to apply the changes.</p>
              </div>
            </div>

            {/* Option 2: .crev-config.yaml */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Option 2: Set in <code className="bg-gray-200 px-1 rounded">.crev-config.yaml</code>
              </h2>
              <p className="text-gray-700 mb-4">
                After running <strong>crev init</strong>, add the Crev API key under the{" "}
                <code className="bg-gray-200 px-1 rounded">crev_api_key</code> key in the{" "}
                <code className="bg-gray-200 px-1 rounded">.crev-config.yaml</code> file.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-red-600">Note:</span> The downside of this is
                that you will need to add your API key to the configuration of every project you
                want to review.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center space-y-4">
            <a
              href="https://github.com/vossenwout/crev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo"
                width={50}
                height={50}
              />
              <span className="text-gray-700 hover:text-gray-900">View on GitHub</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
