"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AIChatModal from "./chat/AIChatModal";
import {
  IoChatbubblesOutline,
  IoNewspaperOutline,
  IoCalendarOutline,
  // IoPersonCircleOutline,
  IoBusinessOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import Hacktivist from "@/assets/icons/logo.png";
import Avatar from "@/components/profile/Avatar/Avatar";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Props = {
  token: RequestCookie | undefined;
  // profileName: string;
};

export default function Navbar({ token }: Props) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiQuery, setAIQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPremium, setIsPremium] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAIQuery(value);
    if (!isAIChatOpen && value.length > 0) {
      setIsAIChatOpen(true);
      e.target.value = "";
      setAIQuery(value);
    }
  };

  const checkPremium = async () => {
    const response = await fetch("/api/clientid");
    const { clientId } = await response.json();

    const data = await fetch("/api/check-premium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
      }),
    });

    const result = await data.json();
    const premium = result?.data;

    if (clientId && premium) {
      setIsPremium(true);
    }

    return null;
  };

  const setPremiumLogout = () => {
    setIsPremium(false);
  };

  useEffect(() => {
    checkPremium();
    console.log("isPremium", isPremium);
  }, [token, isPremium]);

  return (
    <>
      <nav className="fixed top-0 w-full bg-slate-900 shadow-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src={Hacktivist} alt="KONTAS Logo" width={120} height={40} className="w-auto h-8 object-contain" priority />
            <span className="text-xl font-bold text-white">Hacktivist</span>
          </Link>

          {isPremium && (
            <div className="badge badge-warning ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  // strokeWidth="2"
                  // d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Premium
            </div>
          )}

          {/* Center - Search Input */}
          <div className="hidden md:flex items-center bg-slate-800 rounded-lg mx-auto">
            <input ref={inputRef} type="search" placeholder="Ask AI before consulting a lawyer..." onChange={handleInputChange} className="bg-transparent px-4 py-2 text-base focus:outline-none text-white placeholder-gray-400 w-[350px]" />
            <IoSparklesOutline className="w-5 h-5 mr-3 text-gray-400" />
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-6">
            <Link href="/chat" className="text-gray-400 hover:text-white">
              <IoChatbubblesOutline className="w-6 h-6" title="Chat" />
            </Link>

            <Link href="/news" className="text-gray-400 hover:text-white">
              <IoNewspaperOutline className="w-6 h-6" title="Legal News" />
            </Link>

            <Link href="/booking" className="text-gray-400 hover:text-white">
              <IoCalendarOutline className="w-6 h-6" title="Book Lawyer Consultation" />
            </Link>

            <Link href="/about" className="text-gray-400 hover:text-white">
              <IoBusinessOutline className="w-6 h-6" title="About" />
            </Link>

            <Avatar token={token} setPremiumLogout={setPremiumLogout} />
          </div>
        </div>
      </nav>

      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => {
          setIsAIChatOpen(false);
          setAIQuery("");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
        initialQuery={aiQuery}
      />
    </>
  );
}
