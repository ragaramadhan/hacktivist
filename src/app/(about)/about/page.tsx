"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  IoCheckmarkCircle,
  IoTimeOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoStarOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";

export default function About() {
  const stats = [
    {
      icon: <IoTimeOutline className="w-6 h-6" />,
      label: "Tahun Berdiri",
      value: "2020",
    },
    {
      icon: <IoLocationOutline className="w-6 h-6" />,
      label: "Kantor",
      value: "12",
    },
    {
      icon: <IoPeopleOutline className="w-6 h-6" />,
      label: "Pengacara",
      value: "50+",
    },
    {
      icon: <IoStarOutline className="w-6 h-6" />,
      label: "Rating",
      value: "4.9",
    },
  ];

  const features = [
    "Konsultasi Online 24/7",
    "Tim Pengacara Berpengalaman",
    "Solusi Hukum Terpercaya",
    "Jaminan Kerahasiaan",
    "Harga Transparan",
  ];

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Law Office"
          fill
          className="object-cover brightness-50"
          priority
          unoptimized
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Solusi Hukum Modern untuk Era Digital
              </h1>
              <p className="text-xl text-gray-300">
                Menghubungkan Anda dengan pengacara terbaik untuk semua
                kebutuhan hukum
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-16 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800 rounded-xl p-6 text-center">
              <div className="flex justify-center text-yellow-500 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Tentang Hacktivist Indonesia
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Hacktivist Indonesia adalah platform inovatif yang menghubungkan
                klien dengan pengacara profesional secara online. Kami percaya
                bahwa akses ke layanan hukum harus mudah, transparan dan
                terjangkau untuk semua.
              </p>
              <p>
                Dgn teknologi modern & tim pengacara berpengalaman, kami
                menyediakan solusi hukum yg efektif & efisien utk berbagai
                kebutuhan, mulai dari konsultasi bisnis hingga penanganan kasus.
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <IoCheckmarkCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Hubungi Kami</h3>
            <div className="space-y-6">
              <div>
                <div className="text-yellow-500 font-medium mb-2">
                  Kantor Pusat
                </div>
                <div className="text-gray-300">
                  South Tower, Green Office Park 1<br />
                  Jl. BSD Green Office Park 6th Floor
                  <br />
                  Sampora, Kec. Cisauk
                  <br />
                  Kabupaten Tangerang, Banten 15345
                </div>
              </div>
              <div>
                <div className="text-yellow-500 font-medium mb-2">Kontak</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <IoCallOutline className="w-5 h-5 text-gray-400" />
                    <span>+62 999-9999-9999</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <IoMailOutline className="w-5 h-5 text-gray-400" />
                    <span>info@hacktivist.law</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-yellow-500 font-medium mb-2">
                  Jam Operasional
                </div>
                <div className="text-gray-300">
                  Senin - Jumat: 09:00 - 18:00
                  <br />
                  Sabtu: 09:00 - 15:00
                  <br />
                  Minggu: Tutup
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
