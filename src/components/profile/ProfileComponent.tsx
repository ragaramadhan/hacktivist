"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  // IoPersonOutline,
  IoLogOutOutline,
  IoCalendarOutline,
  // IoBookmarkOutline,
  IoCamera,
  IoHomeOutline,
  IoNotificationsOutline,
  IoWalletOutline,
  // IoHelpCircleOutline
} from "react-icons/io5";
import { handleLogoutAction } from "./Avatar/action";
import { SafeUserType } from "../../types/userType";
import { DeleteImageFromCloudinary, UploadImage } from "@/components/auth/uploadImageAction";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/utils/formatRupiah";
import ChatHistoryModal from "./ChatHistoryModal";
import { formatDate } from "@/utils/formatDate";
import { formatTransactionDate } from "@/utils/formatDate";
// interface ConsultationHistory {
//   id: number;
//   lawyer: {
//     name: string;
//     avatar: string;
//   };
//   date: string;
//   duration: string;
//   status: "completed" | "upcoming" | "cancelled";
// }
export interface Payment {
  _id: string;
  amount: number;
  paymentType: string;
  status: string;
  userId: string | null;
  transactionDate: string;
}

export interface ChatRoom {
  _id: string;
  bookDate: string;
  messages?: Message[];
  participants: string[];
  status: string;
  createdAt: string;
  lawyerName?: string;
  lawyerProfile?: profileLawyer;
}
interface profileLawyer {
  name: string;
  certification: string;
}
export interface Message {
  sender: string;
  text: string;
  timestamp: IsiTimeStamp;
}

interface IsiTimeStamp {
  seconds: number;
  nanoseconds: number;
}
interface SavedArticle {
  id: number;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
}

export default function ProfileComponent({ user }: { user: SafeUserType }) {
  interface ScheduleUser {
    _id: string;
    bookDate: string;
    messages: [];
    participants: [string];
    status: string;
    createdAt: string;
    lawyerName: string;
    lawyerCertification: string;
  }
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "saved" | "edit-profile" | "notifications" | "payments" | "help">("overview");

  const router = useRouter();
  // console.log("user yang ada di ProfileComponent nih Bang: ", user);

  const [Payment, setPayment] = useState<Payment[]>([]);
  const [Schedule, setSchedule] = useState<ScheduleUser[]>([]);
  const [Riwayat, setRiwayat] = useState<ChatRoom[]>([]);
  const [selectedChat, setSelectedChat] = useState<Message[] | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<string>("");
  const [selectedIdYouId, setSelectedYouId] = useState<string>("");

  useEffect(() => {
    fetchPayment();
    fetchSchedule();
    fetchRiwayat();
    // console.log(user, "ini untuk cek ");
  }, []);

  // Dummy data
  const fetchPayment = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
      method: "GET",
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data, "ini di data yak bro");
    setPayment(data.data);
    // console.log(Payment, "ini tuh di payment");
  };

  const fetchSchedule = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule`, {
      method: "GET",
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data, "ini di data yak bro");
    setSchedule(data.data);
  };

  const fetchRiwayat = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/room-active`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();
      // console.log(data);

      if (data.status === 200) {
        setRiwayat(data.data);
      } else {
        console.error("Error fetching chat history:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const savedArticles: SavedArticle[] = [
    {
      id: 1,
      title: "Perubahan Signifikan UU Perseroan Terbatas",
      category: "Hukum Bisnis",
      date: "28 Feb 2024",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    },
    {
      id: 2,
      title: "5 Aspek Hukum yg Wajib Diperhatikan Startup",
      category: "Startup",
      date: "27 Feb 2024",
      thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
    },
  ];

  const handleLogout = async () => {
    await handleLogoutAction();
  };

  const oldUrl = user.profile.picture;
  // ? ketika file input berubah maka upload ke cloudinary
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. hapus file yang sudah ada di cloudinary
      // untuk coba hapus harus coba upload dulu file ke cloudinary dan database
      // console.log("oldUrl ketika upload file baru: ", oldUrl);
      // nah ketika sudah ambil oldUrl maka extract url paling belakang
      // kirim delete saja langsung, nanti diextract di delete image
      await DeleteImageFromCloudinary(oldUrl);

      // 2. upload file baru ke cloudinary
      const { secure_url } = await UploadImage(file);

      // 3. ambil url baru dari cloudinary
      // 4. update profile.picture di database
      // kita harus ambil url dari cloudinary dan update profile.picture di database
      // supaya update profile.picture di database
      // kita harus buat put /api/users/:id
      await fetch("/api/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          picture: secure_url,
        }),
      });

      // console.log(response);
      router.refresh();
    }
  };

  const menuItems: Array<{
    id: "overview" | "edit-profile" | "history" | "saved" | "notifications" | "payments" | "help";
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "overview",
      label: "Overview",
      icon: <IoHomeOutline className="w-5 h-5" />,
    },
    // { id: "edit-profile", label: "Edit Profile", icon: <IoPersonOutline className="w-5 h-5" /> },
    {
      id: "history",
      label: "Riwayat Konsultasi",
      icon: <IoCalendarOutline className="w-5 h-5" />,
    },
    // { id: "saved", label: "Artikel Tersimpan", icon: <IoBookmarkOutline className="w-5 h-5" /> },
    {
      id: "notifications",
      label: "Notifikasi",
      icon: <IoNotificationsOutline className="w-5 h-5" />,
    },
    {
      id: "payments",
      label: "Pembayaran",
      icon: <IoWalletOutline className="w-5 h-5" />,
    },
    // { id: "help", label: "Bantuan", icon: <IoHelpCircleOutline className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pb-12">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar - sesuaikan top dgn tinggi navbar */}
            <div className="col-span-12 md:col-span-3">
              <div className="bg-slate-800 rounded-xl p-6 sticky top-20 max-h-[calc(100vh-8rem)]">
                {/* Profile Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      {/* // ! harus di handle kalau user.profile.picture bernilai null */}
                      {!user.profile.picture && <Image src="/user.jpg" alt="Profile" width={96} height={96} className="object-cover" unoptimized />}
                      {user.profile.picture && <Image src={user.profile.picture} alt="Profile" width={96} height={96} className="object-cover" unoptimized />}
                    </div>
                    <label htmlFor="file-upload" className="absolute bottom-0 right-0 p-2 bg-yellow-500 rounded-full text-slate-900 hover:bg-yellow-600 cursor-pointer">
                      <IoCamera className="w-4 h-4" />
                    </label>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {user.name} ({user.role})
                  </h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <input type="file" id="file-upload" onChange={handleFileChange} hidden />
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === item.id ? "bg-yellow-500 text-slate-900" : "text-gray-300 hover:bg-slate-700 hover:text-white"}`}>
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/10">
                    <IoLogOutOutline className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-9 h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="bg-slate-800 rounded-xl p-6">
                {activeTab === "overview" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Total Konsultasi</h4>
                        <p className="text-2xl font-bold text-yellow-500">{Riwayat?.length}</p>
                      </div>
                      {/* <div className="bg-slate-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Artikel Tersimpan</h4>
                        <p className="text-2xl font-bold text-yellow-500">8</p>
                      </div> */}
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Jam Konsultasi</h4>
                        <p className="text-2xl font-bold text-yellow-500">{Riwayat?.length * 8}</p>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Total Pembayaran</h4>
                        <p className="text-2xl font-bold text-yellow-500">{formatRupiah(Payment.reduce((total, payment) => total + payment.amount, 0))}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "history" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">Riwayat Konsultasi</h3>

                    {/* {console.log("Riwayat data:", Riwayat)} */}

                    <div className="space-y-4">
                      {Riwayat.map((riwayat) => {
                        console.log("Messages for riwayat:", riwayat.messages);

                        return (
                          <div key={riwayat._id} className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                              {riwayat.lawyerProfile?.certification && <Image src={riwayat.lawyerProfile?.certification} alt="" width={48} height={48} className="rounded-full object-cover" unoptimized />}
                              <div>
                                <h4 className="text-white font-medium">{riwayat.lawyerName}</h4>
                                <div className="text-sm text-gray-400">
                                  <span>{formatDate(riwayat.bookDate)}</span>
                                  <span className="mx-2">•</span>
                                  <span>1 Sesi</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${riwayat.status === "completed" ? "bg-green-500/10 text-green-500" : riwayat.status === "done" ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"}`}>{riwayat.status === "completed" ? "Selesai" : riwayat.status === "upcoming" ? "Akan Datang" : "Sudah Selesai"}</span>
                              {riwayat.messages && Array.isArray(riwayat.messages) && riwayat.messages.length > 0 && (
                                <button
                                  onClick={() => {
                                    console.log("Clicked messages:", riwayat.messages);
                                    setSelectedChat(riwayat.messages || []);
                                    setSelectedLawyer(riwayat.lawyerName || "");
                                    setSelectedYouId(riwayat.participants[1]);
                                  }}
                                  className="px-3 py-1 bg-yellow-500 text-slate-900 rounded-lg text-xs font-medium hover:bg-yellow-600"
                                >
                                  Lihat Chat
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <ChatHistoryModal
                      isOpen={!!selectedChat}
                      onClose={() => {
                        setSelectedChat(null);
                        setSelectedLawyer("");
                      }}
                      messages={selectedChat || []}
                      lawyerName={selectedLawyer}
                      you={selectedIdYouId}
                    />
                  </motion.div>
                )}

                {activeTab === "saved" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">Artikel Tersimpan</h3>
                    <div className="grid gap-4">
                      {savedArticles.map((article) => (
                        <Link key={article.id} href={`/news/${article.id}`} className="bg-slate-700 rounded-xl overflow-hidden flex items-center gap-4 hover:bg-slate-600 transition-colors">
                          <div className="w-24 h-24 relative flex-shrink-0">
                            <Image src={article.thumbnail} alt={article.title} width={48} height={48} className="rounded-full unoptimized" unoptimized />
                          </div>
                          <div className="flex-1 p-4">
                            <span className="text-yellow-500 text-sm mb-1">{article.category}</span>
                            <h3 className="text-white font-medium mb-1">{article.title}</h3>
                            <span className="text-gray-400 text-sm">{article.date}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
                {activeTab === "notifications" && (
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-4">Konsultasi Mendatang</h4>
                    <div className="space-y-4">
                      {" "}
                      {/* Added wrapper div with space-y-4 */}
                      {Schedule.map((el) => (
                        <div key={el._id} className="flex items-center justify-between bg-slate-600 p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Image src={el.lawyerCertification} alt="" width={48} height={48} className="rounded-full" unoptimized />
                            <div>
                              <h4 className="text-white font-medium">{el.lawyerName}</h4>
                              <p className="text-sm text-gray-400">{formatDate(el.bookDate)}</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-600"> 09.00 </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "payments" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">Pembayaran</h3>
                    {/* Add payments component here */}
                    {Payment?.map((payment) => (
                      <div key={payment._id} className="bg-slate-700 rounded-xl overflow-hidden flex items-center gap-4 hover:bg-slate-600 transition-colors">
                        {/* <div className="w-24 h-24 relative flex-shrink-0">
                          <Image src={payment.thumbnail} alt={payment.title} fill className="object-cover" unoptimized />
                        </div> */}
                        <div className="flex-1 p-4">
                          <span className="text-yellow-500 text-sm mb-1">{payment.status}</span>
                          <h1 className="text-white font-medium mb-1">Transaction ID : {payment._id}</h1>
                          <div className="badge badge-warning mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                // strokeWidth="2"
                                // d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            {payment.paymentType}
                          </div>

                          {/* <h3 className="text-yellow-500 font-medium mb-1">{payment.paymentType}</h3> */}

                          <h3 className="text-white font-medium mb-1">{formatRupiah(payment.amount)}</h3>
                          <span className="text-gray-400 text-sm">{formatTransactionDate(payment.transactionDate)}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
