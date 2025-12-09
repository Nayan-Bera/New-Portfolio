'use client';
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          <Link
            href="#home"
            className="flex items-center gap-2 group"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NB</span>
            </div>
            <span className="font-semibold text-base tracking-tight">
              Nayan Bera
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li>
              <Link
                href="#about"
                className="text-slate-400 hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-4 text-xl text-slate-400">
            <Link
              href="https://x.com/NayanBe68620646"
              aria-label="twitter"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              <RiTwitterXLine />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nayan-kr-bera"
              aria-label="linkedin"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/Nayan-Bera"
              aria-label="github"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.instagram.com/_am_nayan_/?hl=en"
              aria-label="instagram"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              <FaInstagram />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 pb-4">
            <ul className="flex flex-col gap-3 pt-4 text-sm font-medium">
              <li>
                <Link
                  href="#about"
                  onClick={closeMenu}
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  onClick={closeMenu}
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  onClick={closeMenu}
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4 pt-4 text-xl text-slate-400">
              <Link
                href="https://x.com/NayanBe68620646"
                aria-label="twitter"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                <RiTwitterXLine />
              </Link>
              <Link
                href="https://www.linkedin.com/in/nayan-kr-bera"
                aria-label="linkedin"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="https://github.com/Nayan-Bera"
                aria-label="github"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                <FaGithub />
              </Link>
              <Link
                href="https://www.instagram.com/_am_nayan_/?hl=en"
                aria-label="instagram"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
