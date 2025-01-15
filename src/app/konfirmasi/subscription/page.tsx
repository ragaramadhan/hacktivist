import SubscriptionConfirmCard from "@/components/konfirmasi/SubscriptionConfirmCard";

export default function KonfirmasiSubscription() {
  return (
    <main className="min-h-screen bg-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-8">
          <h1 className="text-4xl font-bold text-center text-white mb-4">
            Konfirmasi Langganan
          </h1>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Dapatkan akses konsultasi tanpa batas selama 1 bulan dengan
            pengacara pilihan Anda
          </p>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <SubscriptionConfirmCard />

            {/* Additional Info */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  🌟 Akses Premium
                </h3>
                <p className="text-slate-400 text-sm">
                  Konsultasi tanpa batas selama 1 bulan penuh
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  💰 Lebih Hemat
                </h3>
                <p className="text-slate-400 text-sm">
                  Lebih ekonomis dibandingkan konsultasi sekali
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-2">📱 Fleksibel</h3>
                <p className="text-slate-400 text-sm">
                  Atur jadwal konsultasi sesuai kebutuhan Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
