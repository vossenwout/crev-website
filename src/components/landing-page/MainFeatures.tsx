import Image from "next/image";

export default function MainFeatures() {
  return (
    <section className="w-full max-w-4xl space-y-16">
      {/* Feature 1 */}
      <div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-md">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-3">Bundle Your Codebase</h2>
          <p className="text-gray-600 mb-6">
            Consolidate your entire codebase into a single, manageable file effortlessly.
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

      {/* Feature 2 */}
      <div className="flex flex-col items-start bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">AI-Powered Code Reviews</h2>
        <p className="text-gray-600 mb-6">
          Receive comprehensive AI-driven code reviews to improve code quality, improve performance
          and catch bugs. The review will be saved locally so you don&#39;t need to leave your IDE.
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
  );
}
