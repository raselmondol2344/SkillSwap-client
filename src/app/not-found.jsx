import Link from "next/link";
import { FaHome, FaRegSadTear } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="text-center">
        <FaRegSadTear className="mx-auto mb-5 text-5xl sm:text-6xl text-blue-600" />

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-slate-900">
          404
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-500">
          Page Not Found
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <FaHome />
          Go Home
        </Link>
      </div>
    </main>
  );
}