"use client";
import Link from "next/link";
// import Lottie from "lottie-react";
import successAnimation from "@/assets/lottie/success.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto">
              <Lottie animationData={successAnimation} loop={false} className="w-full h-full" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pembayaran Berhasil!</h2>
          <p className="text-slate-600 mb-8">Terima kasih atas pembayarannya. Silakan lanjutkan untuk menandatangani dokumen.</p>

          <Link href="/tanda-tangan" className="block">
            <button className="w-full bg-primary text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all">Lanjut ke Tanda Tangan</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
