"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}

          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/asset/sslogo.png"
                width={70}
                height={70}
                alt="SkillSwap Logo"
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              />
            </Link>

            <Link href="/">
              <h3 className="whitespace-nowrap text-xl font-bold text-slate-900 sm:text-2xl">
                SKILL<span className="text-blue-600">SWAP</span>
              </h3>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-5 md:flex lg:gap-7">
            {user ? (
              <>
                <li>
                  <Link
                    href="/"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/task"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Browse Task
                  </Link>
                </li>

                <li>
                  <Link
                    href="/frelancer"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Browse Freelancer
                  </Link>
                </li>

                {/* Pricing */}
                <li>
                  <Link
                    href="/pricing"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Pricing
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/task"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Browse Task
                  </Link>
                </li>

                <li>
                  <Link
                    href="/frelancer"
                    className="font-medium text-slate-700 transition hover:text-blue-600"
                  >
                    Browse Freelancer
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden items-center justify-end gap-2 md:flex">

            {/* Logout */}
            {user ? (
              <Button
                onPress={handleSignout}
                variant="danger"
                className="border-slate-300 text-white hover:bg-slate-100 hover:text-red-500"
              >
                Logout
              </Button>
            ) : (
              <>
                {/* Login */}
                <Link href="/login">
                  <Button
                    variant="bordered"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Button>
                </Link>

                {/* Sign Up */}
                <Link href="/signup">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-900 transition hover:bg-blue-50 hover:text-blue-600 md:hidden"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="pb-4 md:hidden">
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

              <ul className="flex flex-col gap-1">

                {user ? (
                  <>
                    {/* Home */}
                    <li>
                      <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Home
                      </Link>
                    </li>

                    {/* Browse Task */}
                    <li>
                      <Link
                        href="/task"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Browse Task
                      </Link>
                    </li>

                    {/* Browse Freelancer */}
                    <li>
                      <Link
                        href="/frelancer"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Browse Freelancer
                      </Link>
                    </li>

                    {/* Pricing */}
                    <li>
                      <Link
                        href="/pricing"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Pricing
                      </Link>
                    </li>

                    {/* Dashboard */}
                    <li>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Dashboard
                      </Link>
                    </li>

                    {/* Logout */}
                    <li>
                      <Button
                      variant="danger"
                        onClick={handleSignout}
                        className="w-full rounded-lg px-4 py-2.5 text-left text-slate-700 transition hover:bg-slate-100"
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    {/* Home */}
                    <li>
                      <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Home
                      </Link>
                    </li>

                    {/* Browse Task */}
                    <li>
                      <Link
                        href="/task"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Browse Task
                      </Link>
                    </li>

                    {/* Browse Freelancer */}
                    <li>
                      <Link
                        href="/frelancer"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        Browse Freelancer
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* Mobile Auth Buttons */}
             {/* Mobile Auth Buttons */}
{!user && (
  <div className="mt-3 flex gap-2 border-t border-slate-200 pt-3">
    <Link
      href="/login"
      className="flex-1"
      onClick={() => setIsMenuOpen(false)}
    >
      <Button
        variant="bordered"
        className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
      >
        Login
      </Button>
    </Link>

    <Link
      href="/signup"
      className="flex-1"
      onClick={() => setIsMenuOpen(false)}
    >
      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
        Sign Up
      </Button>
    </Link>
  </div>
)}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}