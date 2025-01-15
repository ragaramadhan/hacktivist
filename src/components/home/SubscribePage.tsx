"use client";

import { motion } from "framer-motion";
import { FaCrown, FaCheck, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Definisi tipe data untuk plan
type Plan = {
  name: string;
  icon: JSX.Element;
  price: string;
  yearlyPrice?: string;
  color: string;
  popular?: boolean;
  features: string[];
  isDefault?: boolean;
};

const plans: Plan[] = [
  {
    name: "Dasar",
    icon: <FaStar className="text-4xl text-[#DAA520]" />,
    price: "IDR 0",
    yearlyPrice: "IDR 0",
    color: "from-[#B8860B] to-[#DAA520]",
    features: [
      "Konsultasi Hukum Dasar",
      "Template Hukum Dasar",
      "Blog Hukum",
      "Fitur Google Maps",
      "Chat with AI Assistant 24/7",
    ],
    isDefault: true,
  },
  {
    name: "Premium",
    icon: <FaCrown className="text-4xl text-[#DAA520]" />,
    price: "IDR 299,000",
    yearlyPrice: "IDR 2,990,000",
    color: "from-[#B8860B] to-[#DAA520]",
    popular: true,
    features: [
      "Semua Fitur Paket Dasar",
      "Konsultasi Hukum Prioritas",
      "Peninjauan Dokumen Tanpa Batas",
      "Dukungan Email & Telepon Prioritas",
      "Template Hukum Premium",
      "Dukungan Chat Prioritas 24/7",
      "Video Call dengann Pengacara",
      "Chat with AI Assistant 24/7",
    ],
  },
];

// Komponen untuk card subscription
const SubscriptionCard = ({
  plan,
  isSelected,
  onSelect,
}: {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  //   console.log(plan);
  // const router = useRouter();

  // const handleSubs = async () => {
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subs`, {
  //     method: "POST",
  //   });
  //   console.log(`udh bisa`);

  //   router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={plan.isDefault ? undefined : onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={plan.isDefault ? {} : { scale: 0.98 }}
      className={`relative rounded-2xl bg-slate-800/50 backdrop-blur-sm overflow-hidden group 
        ${plan.isDefault ? "cursor-default" : "cursor-pointer"}  
        ${
          isSelected
            ? "ring-2 ring-[#DAA520] border-transparent"
            : plan.popular
            ? "ring-2 ring-[#DAA520]/50 border-transparent"
            : "border border-slate-700/50 hover:border-[#DAA520]/30"
        }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div
          className={`absolute top-0 right-0 text-white text-sm px-4 py-1 rounded-bl-lg
                    ${isSelected ? "bg-[#DAA520]" : "bg-[#DAA520]/70"}`}
        >
          Most Popular
        </div>
      )}

      {/* Background Gradient */}
      <div
        className={`p-8 bg-gradient-to-br ${plan.color} absolute inset-0 
                ${
                  isSelected ? "opacity-10" : "opacity-5 group-hover:opacity-8"
                }`}
      />

      {/* Card Content */}
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {plan.icon}
          <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
        </div>

        {/* Pricing */}
        {plan.price === "Custom" ? (
          <div className="mb-8">
            <div className="text-3xl font-bold text-white mb-1">
              Custom Pricing
            </div>
            <div className="text-white/60">Contact us for custom quote</div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="text-3xl font-bold text-white mb-1">
              {plan.price}
            </div>
            <div className="text-white/60">per month</div>
            <div className="text-sm text-white/40 mt-1">
              {plan.yearlyPrice} / year
            </div>
          </div>
        )}

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-white/80">
              <FaCheck className="text-[#DAA520] flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <Link href="/konfirmasi/subscription">
          {!plan.isDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // console.log(`Selected plan: ${plan.name}, INI SELECTED PAN BOI`);
              }}
              className={`w-full py-3 rounded-lg text-white font-semibold
                bg-gradient-to-r ${plan.color}
                transition-all duration-200 hover:opacity-90 active:scale-95`}
            >
              {plan.price === "Custom" ? "Contact Sales" : "Pilih Paket"}
            </button>
          )}
        </Link>
      </div>
    </motion.div>
  );
};

// Main component
export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("scroll") === "subscribe") {
      const subscribeElement = document.getElementById("subscribe");
      if (subscribeElement) {
        subscribeElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return (
    <div
      id="subscribe"
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-lora text-white mb-4"
          >
            Pilih Paket Perlindungan Hukum Anda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Pilih paket yang sesuai dengan kebutuhan hukum Anda melalui opsi
            berlangganan yang fleksibel
          </motion.p>
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <SubscriptionCard
              key={plan.name}
              plan={plan}
              isSelected={selectedPlan === plan.name}
              onSelect={() => setSelectedPlan(plan.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
