'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "@/src/constant/data";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  // typed input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // typed submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // auto-hide toast after 5s
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Get in Touch
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-5 items-start">
          {/* LEFT INFO SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Let&apos;s build something great together
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                I&apos;m always open to new opportunities and collaborations.
                Feel free to drop me a message anytime!
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group break-all"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {CONTACT.email}
                </span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/nayan-kr-bera/"
                target="_blank"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  linkedin.com/in/nayanbera
                </span>
              </Link>

              <Link
                href="https://github.com/nayan-bera"
                target="_blank"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  github.com/nayanbera
                </span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 w-full"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-slate-900/50 border border-slate-700 
                    text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-slate-900/50 border border-slate-700 
                    text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-slate-900/50 border border-slate-700 
                    text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-2.5 sm:py-3 rounded-lg bg-white text-slate-950 text-sm sm:text-base 
                  font-medium hover:bg-slate-200 transition-all hover:shadow-lg hover:shadow-white/20 
                  disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {/* Toast Messages */}
                {status === "success" && (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 
                  text-xs sm:text-sm text-emerald-300">
                    ✅ Email sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 
                  text-xs sm:text-sm text-red-300">
                    ❌ Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};