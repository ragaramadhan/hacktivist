import Link from 'next/link'
import Image from 'next/image'
import { IoArrowForward } from 'react-icons/io5'

export default function LegalTipsSection() {
    const tips = [
        {
            date: "28 Feb 2024",
            category: "Hukum Bisnis",
            title: "5 Hal Penting yg Harus Ada di Kontrak Bisnis",
            preview: "Pelajari elemen kunci yg wajib ada dalam kontrak bisnis utk melindungi kepentingan perusahaan Anda...",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071"
        },
        {
            date: "27 Feb 2024",
            category: "Tips Hukum",
            title: "Panduan Menghadapi Kasus Pidana Pertama Kali",
            preview: "Langkah-langkah penting yg perlu diketahui ketika Anda atau kerabat menghadapi kasus pidana...",
            image: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?q=80&w=2070"
        },
        {
            date: "26 Feb 2024",
            category: "Update Hukum",
            title: "Perubahan UU ITE 2024: Apa yg Perlu Anda Ketahui",
            preview: "Membahas perubahan signifikan dalam UU ITE terbaru & dampaknya terhadap pengguna internet...",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        }
    ]

    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Legal News & Tips
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Update terbaru dari dunia hukum & tips penting utk Anda
                        </p>
                    </div>
                    <Link 
                        href="/news" 
                        className="mt-6 md:mt-0 group inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                        <span className="text-lg">Lihat Semua Article</span>
                        <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tips.map((tip, index) => (
                        <Link 
                            href="#" 
                            key={index}
                            className="group bg-slate-800/50 backdrop-blur rounded-2xl overflow-hidden hover:bg-slate-800 transition-all duration-300"
                        >
                            <div className="p-4">
                                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                                    <Image
                                        src={tip.image}
                                        alt={tip.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                    <span className="absolute bottom-4 left-4 bg-yellow-500 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                                        {tip.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 pt-2">
                                <div className="mb-3">
                                    <span className="text-gray-400 text-sm">{tip.date}</span>
                                </div>
                                <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-yellow-500 transition-colors">
                                    {tip.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {tip.preview}
                                </p>
                                <span className="inline-flex items-center gap-2 text-yellow-500 group-hover:gap-3 transition-all">
                                    Baca Selengkapnya
                                    <IoArrowForward className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}