"use client";

import { EXPERIENCE } from "@/src/constant/data"; 
import { motion } from "framer-motion";

export const Experiences = () => (
  <section
    id="experience"
    className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Experience
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="space-y-8">
        {EXPERIENCE.map((item, i) => (
          <motion.div
            key={item.role + item.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-6 sm:pl-8 border-l-2 border-slate-700"
          >
            {/* Timeline dot */}
            <div
              className={`absolute -left-2 sm:left-[-9px] top-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-[3px] sm:border-4 border-slate-950 ${item.dotClass}`}
            />

            <div className="pb-6 sm:pb-8">
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                <h4 className="text-lg sm:text-xl font-semibold text-white">
                  {item.role}
                </h4>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] sm:text-xs font-medium text-slate-300">
                  {item.period}
                </span>
              </div>

              <p
                className={`text-xs sm:text-sm font-medium mb-3 sm:mb-4 ${item.companyClass}`}
              >
                {item.company}
              </p>

              {item.description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-400 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
