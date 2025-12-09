'use client';
import { techs } from "@/src/constant/data";
import { motion } from "framer-motion";
export const Technologies = () => {
  return (
    <section
      id="technologies"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Technology Stack
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6 py-3 sm:py-4"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl
                           bg-slate-900/60 border border-slate-800
                           shadow-sm shadow-black/40
                           hover:shadow-md hover:shadow-cyan-400/20
                           backdrop-blur-sm cursor-default
                           transition-all duration-300
                           hover:scale-[1.03]"
              >
                <span className="text-lg sm:text-xl">{tech.icon}</span>
                <span className="text-xs sm:text-sm md:text-base text-slate-100 font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-20 bg-linear-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-20 bg-linear-to-l from-slate-950 to-transparent" />
        </div>
      </div>
    </section>
  );
};
