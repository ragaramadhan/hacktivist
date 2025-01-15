import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dngm0voif/video/upload/v1735297045/Skyscraper_Building_City_Urban_4K_Free_HD_Stock_Footage_-_No_Copyright_Skyscraper_Building_sky_xufzgo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 from-5% via-black/60 via-70% to-slate-900 to-100%" />
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            Melindungi Hak Anda, <br />
            <span className="text-yellow-500">
              Mengamankan Masa <br />
              Depan Anda
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">Dengan pengalaman lebih dari 5 tahun, kami menyediakan solusi hukum yang disesuaikan dengan situasi Anda.</p>
          <Link href="#subscribe">
            <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors">Langganan Sekarang</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
