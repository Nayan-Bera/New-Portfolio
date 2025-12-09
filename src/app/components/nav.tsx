"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiHome, FiUser, FiFolder, FiBriefcase, FiMail } from "react-icons/fi";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const Nav = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

  // Scroll spy – detect which section is in view
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.3, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const desktopLinkClasses = (id: string) =>
    `transition-colors ${
      activeSection === id ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <>
      {/* TOP NAVBAR (desktop + tablet) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleScrollTo("home")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NB</span>
              </div>
              <span className="font-semibold text-base tracking-tight">
                Nayan Bera
              </span>
            </button>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
              <li>
                <button
                  onClick={() => handleScrollTo("about")}
                  className={desktopLinkClasses("about")}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo("projects")}
                  className={desktopLinkClasses("projects")}
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo("experience")}
                  className={desktopLinkClasses("experience")}
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo("contact")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "contact"
                      ? "bg-white text-slate-950"
                      : "bg-slate-100/5 text-slate-200 hover:bg-white hover:text-slate-950"
                  }`}
                >
                  Contact
                </button>
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
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none">
        <div className="relative w-full max-w-xs px-4">
          {/* Curved pill background */}
          <div className="pointer-events-auto bg-slate-900/95 border border-slate-700 rounded-3xl shadow-lg shadow-black/40 px-4 py-2 flex items-center justify-between">
            {[
              { id: "home", icon: <FiHome /> },
              { id: "about", icon: <FiUser /> },
              { id: "projects", icon: <FiFolder /> },
              { id: "experience", icon: <FiBriefcase /> },
              { id: "contact", icon: <FiMail /> },
            ].map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`relative flex items-center justify-center transition-all duration-200 ${
                    isActive ? "-translate-y-2" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center text-base w-10 h-10 ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 rounded-full shadow-md shadow-emerald-500/50"
                        : "text-slate-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
