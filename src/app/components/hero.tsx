'use client';
import Link from "next/link";
import Earth3D from "./earth3D";
import { HERO_CONTENT } from "@/src/constant/data";
import { motion } from "framer-motion";

export const Hero = () => (
  <header
    id="home"
    className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    {/* Responsive 3D Earth background */}
    <div className="pointer-events-none absolute inset-0">
      <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[10%] w-[420px] h-[260px] md:w-[640px] md:h-[380px] lg:w-[900px] lg:h-[540px] opacity-35">
        <Earth3D />
      </div>
      {/* Smaller earth for extra small devices, placed at bottom */}
      <div className="sm:hidden absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[320px] h-[220px] opacity-40">
        <Earth3D />
      </div>
    </div>

    <div className="relative max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-[11px] sm:text-xs font-medium text-slate-300 mb-5 sm:mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
            Full-Stack Developer
            <br />
            <span className=" bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              & System Architect
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {HERO_CONTENT}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/resume.pdf"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-slate-950 text-sm sm:text-base font-medium hover:bg-slate-200 transition-all hover:shadow-lg hover:shadow-white/20"
            >
              View Resume
            </Link>
            <Link
              href="#contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-slate-700 text-slate-300 text-sm sm:text-base font-medium hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>

        {/* Right column cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-2"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                label: "Real-Time Systems",
                desc: "WebSockets, Live Updates, Event Workflows",
              },
              {
                label: "Payments & Integrations",
                desc: "Razorpay, reCAPTCHA, Third-Party APIs",
              },
              { label: "API Architecture", desc: "REST, GraphQL, Auth Flows" },
              {
                label: "Data Engineering",
                desc: "SQL, NoSQL, Performance Optimization",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-3 sm:p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all group cursor-default backdrop-blur"
              >
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white mb-1.5 sm:mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </header>
);