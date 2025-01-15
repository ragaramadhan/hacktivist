"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  // IoStar,
  IoTimeOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import MapSection from "../../../components/MapSection";
import { formatRupiah } from "@/utils/formatRupiah";
// import Lottie from "lottie-react";
import verificationLottie from "@/assets/lottie/verification.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export interface Lawyer {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profiles;
  specialization: string;
  credentials: credentialsLawyer;
  price: number;
  lat?: number;
  lng?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Profiles {
  address: string;
  birth: string;
}

export interface credentialsLawyer {
  education: string[];
  certification: string;
}
const categories = ["Semua", "Hukum Bisnis", "Hukum Pidana", "Hukum Perdata", "Hukum Keluarga", "Hukum Properti", "Hak Kekayaan Intelektual"];

export default function Booking() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [lawyers, setLawyers] = useState<Lawyer[]>([
    // {
    //   id: 1,
    //   name: "Dr. Sarah Wijaya, S.H., M.H.",
    //   specialization: "Hukum Bisnis",
    //   rating: 4.9,
    //   reviews: 128,
    //   experience: "15 tahun",
    //   location: "Jakarta Selatan",
    //   education: "Harvard Law School",
    //   price: "Rp 1.500.000/jam",
    //   availability: "Tersedia hari ini",
    //   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    //   badges: ["Verified", "Top Rated", "Premium"],
    //   lat: -6.2608,
    //   lng: 106.8135,
    // },
    // {
    //   id: 2,
    //   name: "Budi Santoso, S.H., LL.M.",
    //   specialization: "Hukum Pidana",
    //   rating: 4.8,
    //   reviews: 96,
    //   experience: "12 tahun",
    //   location: "Jakarta Pusat",
    //   education: "Universitas Indonesia",
    //   price: "Rp 1.200.000/jam",
    //   availability: "Tersedia besok",
    //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    //   badges: ["Verified", "Senior"],
    //   lat: -6.2088,
    //   lng: 106.8456,
    // },
    // {
    //   id: 3,
    //   name: "Linda Kusuma, S.H.",
    //   specialization: "Hukum Keluarga",
    //   rating: 4.7,
    //   reviews: 84,
    //   experience: "8 tahun",
    //   location: "Jakarta Barat",
    //   education: "Universitas Gadjah Mada",
    //   price: "Rp 900.000/jam",
    //   availability: "Tersedia hari ini",
    //   avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    //   badges: ["Verified"],
    //   lat: -6.1751,
    //   lng: 106.7013,
    // },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lawyers`, {
      method: "GET",
    });
    const response = await data.json();
    // console.log(response.data, "tolong cek ini di lawyer");

    setLawyers(response.data);
  };

  const filteredLawyers = selectedCategory === "Semua" ? lawyers : lawyers.filter((lawyer) => lawyer.specialization === selectedCategory);

  const totalPages = Math.ceil(filteredLawyers.length / 6);
  const paginatedLawyers = filteredLawyers.slice((currentPage - 1) * 6, currentPage * 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-2">Konsultasi dgn Pengacara</h1>
        <p className="text-gray-400">Pilih pengacara sesuai kebutuhan hukum Anda</p>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, idx) => (
            <button key={idx} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${category === selectedCategory ? "bg-yellow-500 text-slate-900 font-medium" : "bg-slate-800 text-gray-400 hover:text-white"}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedLawyers.map((lawyer, idx) => (
            <motion.div key={lawyer._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-800/80 transition-colors">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Image src={lawyer.credentials.certification} alt={lawyer.name} width={80} height={80} className="w-20 h-20 rounded-xl object-cover" unoptimized />
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Lottie animationData={verificationLottie} loop={true} className="w-12 h-12" />
                        <span className="text-sm font-medium text-blue-500">Verified</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{lawyer.name}</h3>
                    <p className="text-yellow-500 text-sm">{lawyer.specialization}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <IoTimeOutline className="w-4 h-4 text-gray-400" />
                    <span>Profesional</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <IoLocationOutline className="w-4 h-4 text-gray-400" />
                    <span>{lawyer.profile.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <IoSchoolOutline className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {lawyer.credentials.education.map(
                        (el, idx) =>
                          // Only show the first education entry (S1)
                          idx === 1 && (
                            <span key={idx} className="text-sm">
                              {Object.values(el)[0]}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-white font-medium">{formatRupiah(lawyer.price)}</div>
                    <div className="text-green-500 text-sm">Tersedia</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.scrollToLawyer) {
                          window.scrollToLawyer(lawyer._id);
                        }
                      }}
                      className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors"
                      title="Lihat di Map"
                    >
                      <IoLocationOutline className="w-6 h-6" />
                    </button>
                    <Link href={`/booking/${lawyer._id}`} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 mb-12 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === index + 1 ? "bg-yellow-500 text-slate-900" : "bg-slate-800 text-gray-400 hover:text-white"}`}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Maps Section */}
      <MapSection lawyers={lawyers} />
    </div>
  );
}
