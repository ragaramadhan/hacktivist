// import Link from "next/link";
import Image from "next/image";
import {
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  // IoShieldOutline,
} from "react-icons/io5";
import Hacktivist from "@/assets/icons/logo.png";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [{ name: "Hukum Pidana" }, { name: "Hukum Bisnis" }, { name: "Hukum Properti" }, { name: "Hukum Keluarga" }, { name: "Hukum Kontrak" }, { name: "Hukum Perlindungan" }],
    company: [{ name: "Tentang Kami" }, { name: "Tim Kami" }, { name: "Karir" }, { name: "Blog" }, { name: "Press Kit" }, { name: "Partner" }],
    support: [{ name: "FAQ" }, { name: "Kontak" }, { name: "Privacy Policy" }, { name: "Terms of Service" }, { name: "Sitemap" }, { name: "Help Center" }],
    resources: [{ name: "Legal Templates" }, { name: "E-Books" }, { name: "Webinars" }, { name: "Case Studies" }, { name: "Legal News" }, { name: "Legal Tips" }],
  };

  return (
    <footer className="bg-slate-900 pt-16">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-slate-800 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Dapatkan Notifikasi Terkini</h3>
              <p className="text-gray-400">Berlangganan untuk mendapatkan informasi terbaru mengenai layanan kami</p>
            </div>
            <div className="flex justify-end">
              <Link href="#subscribe">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors">Aktifkan Notifikasi</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Company Info - 2 columns wide */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 cursor-pointer">
              <Image src={Hacktivist} alt="Logo" width={120} height={40} className="w-auto h-8 object-contain" />
              <span className="text-xl font-bold text-white">Hacktivist</span>
            </div>
            <p className="text-gray-400 mb-6">Solusi hukum modern dengan kombinasi pengalaman & teknologi AI untuk hasil terbaik. Kami berkomitmen memberikan layanan hukum terpercaya sejak 2020.</p>
            <div className="flex gap-4 mb-6">
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <IoLogoTwitter className="w-6 h-6" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <IoLogoLinkedin className="w-6 h-6" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <IoLogoInstagram className="w-6 h-6" />
              </span>
            </div>
          </div>

          {/* Quick Links - 4 columns */}
          <div>
            <h3 className="text-white font-semibold mb-6">Layanan</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Perusahaan</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <IoLocationOutline className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-400">South Tower, Green Office Park 1, Jl. BSD Green Office Park 6th Floor, Sampora, Kec. Cisauk, Kabupaten Tangerang, Banten 15345</span>
          </div>
          <div className="flex items-center gap-3">
            <IoCallOutline className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-400">+62 999-9999-9999</span>
          </div>
          <div className="flex items-center gap-3">
            <IoMailOutline className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-400">info@hacktivist.law</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Hacktivist Law Firm. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-gray-400 hover:text-white text-sm cursor-pointer">Privacy Policy</span>
              <span className="text-gray-400 hover:text-white text-sm cursor-pointer">Terms of Service</span>
              <span className="text-gray-400 hover:text-white text-sm cursor-pointer">Cookies Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
