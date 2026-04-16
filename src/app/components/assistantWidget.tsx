"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import {
  ChatMessage,
  useSendChatMessageMutation,
} from "@/src/store/chatApi";

type Message = ChatMessage & {
  id: number;
};

export const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sendChatMessage, { isLoading }] = useSendChatMessageMutation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi, I'm Nayan's assistant. Ask me anything about this portfolio, projects, or experience.",
    },
  ]);

  const sendMessage = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const history = messages.map(({ role, content }) => ({ role, content }));
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsOpen(true);

    try {
      const response = await sendChatMessage({
        message: trimmed,
        history,
      }).unwrap();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response.reply,
        },
      ]);
    } catch (error) {
      console.error("Assistant chat failed:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I couldn't reach the assistant server right now. Please try again in a moment.",
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-2 right-1 z-50 flex items-end sm:bottom-4 sm:right-3 lg:bottom-5 lg:right-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute bottom-5 right-[calc(100%-3.25rem)] mr-2 flex h-[min(62vh,32rem)] w-[min(calc(100vw-4.5rem),24rem)] flex-col overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-slate-950/95 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:bottom-6 sm:right-[calc(100%-3.75rem)] sm:h-[min(64vh,34rem)] sm:w-[23rem] lg:h-[34rem] lg:w-[24rem]"
          >
            <div className="border-b border-slate-800 bg-linear-to-r from-cyan-500/10 via-slate-900 to-blue-500/10 px-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Nayan&apos;s Assistant
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Clean chat shell ready for your API integration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-slate-700 p-2 text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
                  aria-label="Close assistant widget"
                >
                  <FiX />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] rounded-3xl px-4 py-3 text-[15px] leading-7 ${
                      message.role === "user"
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-slate-800 bg-slate-900/80 text-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-800 bg-slate-950/95 px-4 py-4 sm:px-5">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage(input);
                }}
                className="flex items-center gap-3 rounded-[1.5rem] border border-slate-800 bg-slate-900/80 px-4 py-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-[15px] text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-cyan-400 p-3 text-slate-950 transition-colors hover:bg-cyan-300"
                  aria-label="Send message"
                >
                  <FiSend />
                </button>
              </form>
              {isLoading && (
                <p className="mt-3 text-xs text-slate-500">
                  Assistant is typing...
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileTap={{ scale: 0.96 }}
        className="relative rounded-full"
        aria-expanded={isOpen}
        aria-label="Open assistant widget"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-6, -4, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative origin-bottom-right w-[clamp(72px,12vw,112px)] sm:w-[clamp(78px,11vw,124px)]"
        >
          <div className="absolute bottom-1 left-1/2 h-5 w-[68%] -translate-x-1/2 rounded-full bg-cyan-400/25 blur-xl sm:bottom-2" />

          <div className="relative aspect-[4/5] w-full drop-shadow-[0_18px_36px_rgba(8,145,178,0.18)]">
            <Image
              src="/chatbot.png"
              alt="Floating chatbot assistant"
              fill
              priority
              sizes="(max-width: 640px) 72px, (max-width: 1024px) 104px, 124px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
};
