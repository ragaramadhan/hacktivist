/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Protokol URL
        hostname: "images.hukumonline.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https", // Protokol URL
        hostname: "img.daisyui.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https", // Protokol URL
        hostname: "images.unsplash.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https", // Protokol URL
        hostname: "images.pexels.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
    ],
  },
};

export default nextConfig;
