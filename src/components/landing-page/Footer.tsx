import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 w-full border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-3 px-4 overflow-hidden sm:px-6 lg:px-8 flex-col justify-center items-center ">
        <div className="flex justify-center mt-3 text-center text-base text-gray-800">
          <a
            href="https://github.com/vossenwout/crev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              width={30}
              height={30}
              style={{ backgroundColor: "transparent" }}
            />
          </a>
        </div>
        <p className="mt-4 text-center text-base text-gray-800">Contact: crevcli@outlook.com</p>
        <p className="mt-4 text-center text-base text-gray-800">
          © 2024 Crev. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
