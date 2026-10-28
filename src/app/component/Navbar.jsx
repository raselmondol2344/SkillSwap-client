"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 border-b border-slate-200 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
        
                   <div className="flex   items-center gap-3">
                     <Link href="/" >
                    <Image
                        src="/asset/sslogo.png"
                        width={70}
                        height={70}
                        alt="SkillSwap Logo"
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain "
                    />

                    
                    </Link>
                    
                    <Link href={'/'}> 
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 whitespace-nowrap">
                        SKILL<span className="text-blue-600">SWAP</span>
                    </h3>
                    </Link>
                   </div>


          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-7">

            <li>
              <Link
                href="/"
                className="text-slate-700 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>
            </li>
            



            <li>
              <Link
                href="/task"
                className="text-slate-700 hover:text-blue-600 font-medium transition"
              >
                Browse Task
              </Link>
            </li>

            <li>
              <Link
                href="/frelancer"
                className="text-slate-700 hover:text-blue-600 font-medium transition"
              >
                Browse Freelancer
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="text-slate-700 hover:text-blue-600 font-medium transition"
              >
                Dashboard
              </Link>
            </li>

          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex justify-end items-center gap-2">

            {/* Logout */}
            <Button
              variant="bordered"
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Logout
            </Button>

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
            <Link href="/signUp">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-900 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
                className="w-6 h-6"
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
          <div className="md:hidden pb-4">
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">

              <ul className="flex flex-col gap-1">

                {/* Home */}
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Home
                  </Link>
                </li>

                {/* Browse Task */}
                <li>
                  <Link
                    href="/task"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Browse Task
                  </Link>
                </li>

                {/* Browse Freelancer */}
                <li>
                  <Link
                    href="/frelancer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Browse Freelancer
                  </Link>
                </li>

                {/* Dashboard */}
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Dashboard
                  </Link>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                  >
                    Logout
                  </button>
                </li>

              </ul>

              {/* Mobile Auth Buttons */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200">

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
                  href="/signUp"
                  className="flex-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>

              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
