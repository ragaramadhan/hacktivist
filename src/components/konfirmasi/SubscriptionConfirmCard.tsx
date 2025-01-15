"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SubscriptionConfirmCard() {
  const router = useRouter();

  const handleSubmit = async () => {
    router.push(`/billing-subscription`);
  };

  const checkPremium = async () => {
    const response = await fetch("/api/clientid");
    const { clientId } = await response.json();

    if (!clientId) {
      toast.error("Silahkan login terlebih dahulu.");
      router.push("/login");
    }

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
    const isPremium = result?.data;

    if (isPremium) {
      toast.error("Anda sudah berlangganan");
      router.push("/");
    }

    return null;
  };

  useEffect(() => {
    checkPremium();
  }, []);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative h-[400px]">
          <Image
            src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg"
            alt="Law-Subscription"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Keanggotaan Premium
              </h2>
              <p className="mt-2 text-slate-600">
                Akses tanpa batas untuk semua layanan konsultasi hukum selama 1
                bulan
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Durasi:</span>
                <span className="font-medium text-gray-500">1 Bulan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Biaya Langganan:</span>
                <span className="font-medium text-gray-500">Rp 299,000</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-slate-600">Konsultasi tanpa batas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-slate-600">
                  Akses ke seluruh pengacara
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-slate-600">
                  Prioritas dalam antrian konsultasi
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
