import { useRouter } from "next/navigation";

export default function CallToActionSmall() {
  const router = useRouter();

  return (
    <section className="text-center">
      <p className="text-2xl mb-4 font-bold">Interested in improving your code quality?</p>
      <button
        onClick={() => router.push("/docs")}
        className="px-6 py-3 bg-white border-2 border-black text-black text-lg rounded-lg transition-colors duration-200 hover:bg-gray-100"
      >
        Get Started
      </button>
    </section>
  );
}
