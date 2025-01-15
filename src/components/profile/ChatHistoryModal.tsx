"use client";

import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "./ProfileComponent";
import { formatTimestamp } from "@/utils/formatTimestamp";

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages?: Message[];
  lawyerName?: string;
  you: string;
}

export default function ChatHistoryModal({ isOpen, onClose, messages = [], lawyerName, you }: ChatHistoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ y: -20, opacity: 0, scale: 0.8 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0, scale: 0.8 }} transition={{ type: "spring", duration: 0.5 }} className="fixed inset-x-0 top-24 max-w-2xl mx-auto">
            <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-700">
              {/* Header */}
              <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-slate-900 font-bold">{lawyerName?.[0]?.toUpperCase() || "C"}</span>
                  </div>
                  <span className="font-semibold text-white">Chat dengan {lawyerName || "Konsultan"}</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="max-h-[calc(70vh-140px)] overflow-y-auto bg-slate-800 p-4">
                {messages.map((msg, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} className={`flex ${msg.sender === you ? "justify-end" : "justify-start"} mb-4`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === you ? "bg-red-500 text-white rounded-tr-none" : "bg-slate-700 text-gray-100 rounded-tl-none"}`}>
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
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                      <div className="text-xs text-gray-300/70 mt-1">{formatTimestamp(msg.timestamp)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
