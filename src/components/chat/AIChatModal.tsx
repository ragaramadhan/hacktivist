"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSparklesOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface ChatMessage {
  isUser: boolean;
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery: string;
}

export default function AIChatModal({ isOpen, onClose, initialQuery }: AIChatModalProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  // const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialQuery) {
      setQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setIsLoading(false);
      setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const userPrompt = query;
    setMessages((prev) => [...prev, { isUser: true, text: userPrompt }]);
    setQuery("");

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt: `
You are Hacktivist, a legal assistant specializing in Indonesian law. Always respond in English or Indonesian based on the user's input language.

Structure your answers using proper Markdown formatting for clarity:
- Use headings (e.g., ### Heading) for major points.
- Ensure that lists are properly formatted with newlines separating each item.
  Example:
  1. First item.
  2. Second item with details.
  3. Third item with more details.

- Add a blank line between paragraphs, headings, and lists.
- Use * or - for unordered lists and 1. for ordered lists.

Provide concise and actionable advice, citing specific Indonesian legal provisions (UUD, articles, and clauses) when relevant. End your response with this disclaimer: "Disclaimer: My knowledge of Indonesian law is up to date as of January 2025."

Ensure the output is properly formatted and easy to read.
          `,
          userPrompt,
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        setCurrentResponse((prev) => prev + chunk);
      }

      const cleanedResult = result
        .replace(/(\d+\.\s)/g, "\n$1")
        .replace(/(\*\s)/g, "\n$1")
        .replace(/\n\n+/g, "\n\n")
        .trim();

      if (cleanedResult?.includes("Please login first. 🤖")) {
        setMessages((prev) => [...prev, { isUser: false, text: "Please login first. 🤖" }]);
        toast.error("Silahkan login terlebih dahulu.");
      } else {
        setMessages((prev) => [...prev, { isUser: false, text: cleanedResult }]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setMessages((prev) => [...prev, { isUser: false, text: "Sori, ada error nih... 😅" }]);
    } finally {
      setIsLoading(false);
      setQuery("");
      setCurrentResponse("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ y: -20, opacity: 0, scale: 0.8 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0, scale: 0.8 }} transition={{ type: "spring", duration: 0.5 }} className="fixed inset-x-0 top-24 max-w-2xl mx-auto">
            <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-700">
              {/* Header */}
              <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <IoSparklesOutline className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-white">Legal AI Assistant</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Messages */}
              <div ref={chatContainerRef} className="max-h-[calc(70vh-140px)] overflow-y-auto bg-slate-800 p-4">
                {messages.map((msg, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} className={`flex ${msg.isUser ? "justify-end" : "justify-start"} mb-4`}>
                    {msg.isUser ? (
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.isUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-slate-700 text-gray-100 rounded-tl-none"}`}>{msg.text}</div>
                    ) : (
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.isUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-slate-700 text-gray-100 rounded-tl-none"}`}>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-2">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
                            li: ({ children }) => <li className="ml-4">{children}</li>,
                            h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-lg font-semibold my-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-base font-medium my-2">{children}</h3>,
                          }}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 px-4 py-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </motion.div>
                )}

                {isLoading && currentResponse && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 px-4 py-2">
                    <div className={"max-w-[80%] rounded-2xl px-4 py-2 bg-slate-700 text-gray-100 rounded-tl-none"}>{currentResponse}</div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-slate-700 bg-slate-900">
                <div className="relative flex items-center">
                  <input autoFocus type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress} placeholder="Ketik pesan kamu..." className="w-full bg-slate-800 rounded-full pl-4 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={handleSearch} disabled={isLoading || !query.trim()} className={`absolute right-2 p-2 rounded-full ${query.trim() ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
