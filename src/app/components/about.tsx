'use client';
import { ABOUT_TEXT, CONTACT } from "@/src/constant/data";
import { motion } from "framer-motion";
import Link from "next/link";
export const About = () => (
  <section
    id="about"
    className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
  >
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            About
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {ABOUT_TEXT}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6 sm:mt-8">
              {/* Core Expertise */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-1 h-4 bg-cyan-400 rounded-full" />
                  Core Expertise
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    Backend API development and structured workflow engineering
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    System architecture, module design, and schema modeling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    Secure integrations including authentication and payment
                    services
                  </li>
                </ul>
              </div>

              {/* Focus Areas */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-1 h-4 bg-blue-400 rounded-full" />
                  Focus Areas
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    Real-time features built with WebSockets and event workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    SQL/NoSQL data modeling, optimization, and performance
                    tuning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    DevOps processes with Docker, Dokploy, and Nixpacks
                    deployments
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">
                Quick Info
              </h4>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center gap-4">
                  <dt className="text-slate-400">Location</dt>
                  <dd className="text-white font-medium text-right">
                    Remote / India
                  </dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="text-slate-400">Experience</dt>
                  <dd className="text-white font-medium text-right">
                    1+ Years
                  </dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="text-slate-400">Role</dt>
                  <dd className="text-white font-medium text-right">
                    Web Developer
                  </dd>
                </div>
                <div className="pt-3 border-t border-slate-700/50">
                  <Link
                    href={`mailto:${CONTACT.email}`}
                    className="break-all text-cyan-400 hover:text-cyan-300 transition-colors text-xs sm:text-sm font-medium"
                  >
                    {CONTACT.email}
                  </Link>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
