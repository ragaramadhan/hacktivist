import KonsultasiConfirmCard from "@/components/konfirmasi/KonsultasiConfirmCard";

export default function KonfirmasiKonsultasi() {
  return (
    <main className="min-h-screen bg-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-8">
          <h1 className="text-4xl font-bold text-center text-white mb-4">
            Konfirmasi Konsultasi
          </h1>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Mohon periksa detail konsultasi kamu dengan cermat sebelum melanjutkan
            ke pembayaran
          </p>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <KonsultasiConfirmCard />

            {/* Additional Info */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  💼 Profesional
                </h3>
                <p className="text-slate-400 text-sm">
                  Konsultasi dgn pengacara berpengalaman dan tersertifikasi
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  🔒 Privasi Terjamin
                </h3>
                <p className="text-slate-400 text-sm">
                  Semua informasi kamu akan dijaga kerahasiaannya
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-2">
                  ⚡ Respon Cepat
                </h3>
                <p className="text-slate-400 text-sm">
                  Konsultasi akan dimulai sesuai jadwal yang sudah ditentukan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
