"use client";

import { memo } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

interface CTAButtonProps {
  href: string;
  className?: string;
}

export const CTAButton = memo(
  ({ href, className = "" }: CTAButtonProps) => (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 px-8 py-4 
                  overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600
                  hover:from-amber-600 hover:to-amber-700 
                  shadow-lg hover:shadow-amber-500/25
                  transform hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-200 ${className}`}
    >
      <span className="relative z-10 text-white font-medium">Free Consultation</span>
      <HiArrowRight
        className="w-5 h-5 text-white transition-transform 
                                group-hover:translate-x-1"
      />
    </Link>
  )
);

CTAButton.displayName = "CTAButton";