"use client";

import { useState, useRef, useEffect } from "react";
import { IoMail, IoLockClosed, IoPaperPlane, IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import MottoSection from "./motto-section";
import { registerUser, registerLawyer, handleLogin } from "./action";
import { useRouter } from "next/navigation";
import { UploadImage } from "./uploadImageAction";
import { toast } from "react-toastify";

interface AuthFormProps {
  type?: "login" | "register";
}

// ! export interface by Kelvin untuk action login
export interface LoginFormData {
  email: string;
  password: string;
}

// ! export interface by Kelvin untuk action register
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: "client" | "lawyer";
  address: string;
  birthDate: string;
  specialization: string;
  education: string;
  certification: File | null;
}

const FileInput = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full px-4 py-2 bg-black/40 border-b-2 border-white/30 text-white hover:border-white transition-all text-left rounded-lg">
        {fileName || "Pilih file..."}
      </button>
      <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
    </div>
  );
};

export default function AuthForm({ type = "login" }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "client",
    address: "",
    birthDate: "",
    specialization: "",
    education: "",
    certification: null,
  });
  const [certification, setCertification] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // ? menggunakan useRouter untuk berpindah halaman jika register berhasil (Kelvin)
  const router = useRouter();

  // ! Kelvin menambahkan async untuk action register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === "register") {
        const sanitizedData = {
          ...formData,
          certification: certification ? certification.name : null,
        };

        // console.log(formData);
        // todo: register data to api server with action by Kelvin
        // ? jika register berhasil maka berpindah ke halaman login
        // const response = await registerUser(sanitizedData);
        if (formData.role === "client") {
          const response = await registerUser(sanitizedData);
          if (response.message === "Success Register") {
            toast.success("Berhasil Daftar");
            router.push("/login");
          }
        } else if (formData.role === "lawyer") {
          // ? upload data menggunakan cloudinary
          let secureImageUrlCloudinary = null;
          if (formData.certification) secureImageUrlCloudinary = await UploadImage(formData.certification);
          const registerFormData = {
            ...formData,
            certification: secureImageUrlCloudinary.secure_url,
          };

          const response = await registerLawyer(registerFormData);
          if (response.message === "Success Register Lawyer") {
            toast.success("Berhasil daftar, tunggu konfirmasi tim kami ya!");
            router.push("/login");
          }
        }
      } else {
        // console.log("Login attempt:", { email, password });

        // ! Login action by Kelvin
        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        const check = await handleLogin(formData);
        if (!check) {
          toast.error("Invalid Credentials");
        } else {
          router.push("/");
        }
      }

      // ! jika ada error, maka redirect ke halaman register lagi dengan error (Kelvin)
      // if (response && response.ok) redirect("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCertification(file);
      setFormData((prev) => ({
        ...prev,
        certification: file,
      }));
      // console.log("form Data kalau ada file: ", formData);
    }
  };

  const checkLogin = async () => {
    const response = await fetch("/api/clientid");
    const { clientId } = await response.json();

    if (clientId) {
      toast.error("Anda sudah login.");
      router.push("/");
    }

    return null;
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // LOGIN FORM
  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <label className="text-sm font-medium text-white/90 mb-1.5 block">Alamat Email</label>
        <div className="relative">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans pl-12" placeholder="Masukkan email kamu" required />
          <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-lg" />
        </div>
      </div>

      <div className="relative">
        <label className="text-sm font-medium text-white/90 mb-1.5 block">Kata Sandi</label>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans pl-12" placeholder="Masukkan kata sandi kamu" required />
          <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-lg" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors">
            {showPassword ? <IoEyeOff className="text-lg" /> : <IoEye className="text-lg" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-white/30 bg-white/20 text-blue-500 
                         focus:ring-blue-400/50 focus:ring-offset-0 focus:ring-2"
          />

          <span className="ml-2 text-white/90">Ingat aku</span>
        </label>
        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
          Lupa kata sandi?
        </a>
      </div>

      <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 font-medium">
        Masuk
        <IoPaperPlane className="text-lg" />
      </button>
    </form>
  );

  // REGISTER FORM
  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-white mb-1 block">Nama Lengkap</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" placeholder="Masukkan nama lengkap" required />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-white mb-1 block">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" placeholder="Masukkan email" required />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-white mb-1 block">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" placeholder="Masukkan password" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors">
              {showPassword ? <IoEyeOff className="text-lg" /> : <IoEye className="text-lg" />}
            </button>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-white mb-1 block">Peran</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as "client" | "lawyer",
              })
            }
            className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans"
            required
          >
            <option value="client" className="bg-gray-800">
              Client
            </option>
            <option value="lawyer" className="bg-gray-800">
              Lawyer
            </option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-white mb-1 block">Alamat</label>
          <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" placeholder="Masukkan alamat lengkap" rows={3} required />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-white mb-1 block">Tanggal Lahir</label>
          <input type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" />
        </div>
      </div>

      {formData.role === "lawyer" && (
        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/10">
          <div className="col-span-2">
            <h3 className="text-lg font-medium text-white mb-4">Informasi Pengacara</h3>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-medium text-white mb-1 block">Spesialisasi</label>
            <input type="text" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" placeholder="Masukkan area spesialisasi" />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-medium text-white mb-1 block">Pendidikan</label>
            <input type="text" value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} className="w-full px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white focus:border-blue-400/60 outline-none transition-all placeholder-white/50 rounded-xl hover:border-white/40 font-sans" placeholder="Masukkan riwayat pendidikan" />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-white mb-1 block">Sertifikasi (KTA dan Foto)</label>
            <FileInput onChange={handleFileChange} />
          </div>
        </div>
      )}

      <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 font-medium">
        Daftar
        <IoPaperPlane className="text-lg" />
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-5xl flex gap-6 items-stretch relative z-10 py-20">
        {type === "login" && (
          <div className="w-[520px] hidden lg:flex">
            <MottoSection />
          </div>
        )}

        <div className={`flex-1 ${type === "register" ? "max-w-4xl mx-auto" : ""}`}>
          <div
            className="
                        bg-white/10 
                        backdrop-blur-xl 
                        p-10 
                        border 
                        border-white/20 
                        rounded-3xl 
                        relative
                        w-full 
                        h-full 
                        shadow-2xl
                    "
          >
            <h1 className="text-3xl font-lora text-center mb-8 text-white">{type === "login" ? "Selamat Datang di Hacktivist" : "Daftar Akun Baru"}</h1>

            {type === "register" ? renderRegisterForm() : renderLoginForm()}

            <div className="mt-6 text-center text-sm">
              <p className="text-white">
                {type === "login" ? (
                  <>
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-blue-200 hover:text-blue-300 font-medium">
                      Daftar
                    </Link>
                  </>
                ) : (
                  <>
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-blue-200 hover:text-blue-300 font-medium">
                      Masuk
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
