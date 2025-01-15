"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HiScale, HiUserGroup, HiOfficeBuilding, HiCash, HiHome, HiDocumentText } from "react-icons/hi";
import Link from "next/link";

const services = [
  {
    icon: HiScale,
    title: "Hukum Pidana",
    description: "Penanganan profesional kasus pidana dengan rekam jejak yang terbukti",
    href: "/booking",
    gradient: "from-red-500/20 to-amber-500/20",
  },
  {
    icon: HiUserGroup,
    title: "Hukum Keluarga",
    description: "Solusi ahli untuk kasus perceraian, warisan & hak asuh anak",
    href: "/booking",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: HiOfficeBuilding,
    title: "Hukum Perusahaan",
    description: "Dukungan hukum menyeluruh untuk kebutuhan bisnis Anda",
    href: "/booking",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: HiCash,
    title: "Hukum Perpajakan",
    description: "Penyelesaian sengketa pajak dan optimalisasi kepatuhan",
    href: "/booking",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: HiHome,
    title: "Hukum Properti",
    description: "Bantuan hukum dalam transaksi properti & sengketa tanah",
    href: "/booking",
    gradient: "from-indigo-500/20 to-sky-500/20",
  },
  {
    icon: HiDocumentText,
    title: "Perizinan",
    description: "Panduan ahli melalui prosedur perizinan yang kompleks",
    href: "/booking",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ServicesSection() {
  const ref = useRef(null);

  return (
    <section className="w-full bg-slate-900 py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div ref={ref} variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-16">
          {/* Section Header with gradient text */}
          <div className="text-center space-y-4">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-lora font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Layanan Hukum Kami
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">
              Solusi hukum komprehensif yg dirancang untuk melindungi hak dan kepentingan Anda
            </motion.p>
          </div>

          {/* Services Grid with glass effect */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {services.map((service, idx) => (
              <motion.div key={service.title} variants={fadeInUp} transition={{ delay: idx * 0.1 }}>
                <Link
                  href={service.href}
                  className={`group h-full relative flex flex-col bg-white/[0.03] backdrop-blur-sm 
                            rounded-2xl p-8 overflow-hidden border border-white/10 
                            hover:border-white/20 transition-all duration-500`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center
                                  transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    >
                      <service.icon className="w-6 h-6 text-amber-400" />
                    </div>

                    <h3 className="text-xl font-lora font-semibold text-white">{service.title}</h3>

                    <p
                      className="text-white/70 group-hover:text-white/90 
                                  transition-colors duration-500"
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div
                    className="mt-8 flex items-center gap-2 text-amber-400 
                                group-hover:translate-x-2 transition-transform duration-500"
                  >
                    <span className="text-sm font-medium">Pelajari Lebih Lanjut</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
