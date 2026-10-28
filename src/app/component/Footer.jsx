
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex   items-center gap-3">
                     <Link href="/" >
                    <Image
                        src="/asset/sslogo.png"
                        width={50}
                        height={50}
                        alt="SkillSwap Logo"
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain "
                    />

                    
                    </Link>
                    
                    <Link href={'/'}> 
                    <h3 className="text-md sm:text-lg font-bold text-slate-900 whitespace-nowrap">
                        SKILL<span className="text-blue-600">SWAP</span>
                    </h3>
                    </Link>
                   </div>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Connect with skilled freelancers, discover exciting tasks,
              and turn your skills into opportunities with SkillSwap.
            </p>

            {/* Social Media */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/task"
                  className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                >
                  Browse Tasks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="mailto:raselmondol3330@gmail.com"
                className="flex items-start gap-3 text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                <FaEnvelope className="mt-1 shrink-0 text-base text-blue-600" />
                <span className="break-all">
                  raselmondol3330@gmail.com
                </span>
              </a>

              <a
                href="tel:01703114263"
                className="flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                <FaPhoneAlt className="shrink-0 text-base text-blue-600" />
                <span>01703114263</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright inside the same footer */}
        <div className="mt-8 py-5 text-center">
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-slate-700">
              SkillSwap
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
