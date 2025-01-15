"use client";
// import truncateString from "@/lib/truncateString";
// import Link from "next/link";
import {
  useRouter,
  // useSearchParams
} from "next/navigation";
import {
  // useEffect,
  useState,
} from "react";
// import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

type Lawyer = {
  id: string;
  name: string;
  image: string;
  bio: string;
  fee: number;
  skill: string;
};

export default function LawyersCard() {
  const lawyers: Lawyer[] = [
    {
      id: "1",
      name: "Dr.Stephanie Mo",
      image:
        "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Dr.Stephanie Mo adalah seorang ahli hukum terkemuka yang memiliki keahlian khusus di bidang Hukum Hak Kekayaan Intelektual dan Teknologi. Ia memperoleh gelar Sarjana Hukum (SH) dari Universitas Padjadjaran dengan predikat cum laude, kemudian melanjutkan studi Magister Hukum (LL.M.) di University of California, Berkeley, dengan konsentrasi pada Hukum Teknologi dan Inovasi. Dr. Siti juga menyelesaikan gelar Doktor (Ph.D.) di National University of Singapore dengan penelitian mendalam tentang perlindungan data dan privasi digital. Sebagai praktisi dan akademisi, ia aktif memberikan konsultasi hukum kepada startup, perusahaan teknologi, dan organisasi internasional, serta sering menjadi pembicara di konferensi hukum global. Dr. Siti dikenal atas pendekatannya yang inovatif dalam menyelesaikan tantangan hukum di era digital.",
      fee: 50000,
      skill:
        "Melayani Konsultasi Hukum Pidana, Konsultasi Hukum Perdata, Konsultasi hukum korporasi",
    },
    {
      id: "2",
      name: "Dr. Andi Sanjaya",
      image:
        "https://images.pexels.com/photos/4427620/pexels-photo-4427620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Dr. Andi Sanjayaadalah seorang ahli ekonomi dengan pengalaman luas dalam analisis dan pengembangan kebijakan ekonomi. Ia meraih gelar Sarjana Ekonomi (SE) dari Universitas Indonesia dengan predikat cum laude dan melanjutkan pendidikan Magister Ekonomi (ME) di Universitas Oxford, Inggris, dengan fokus pada Ekonomi Pembangunan. Dr. Rina juga menuntaskan program Doktoral (Ph.D.) di Universitas Harvard dengan penelitian mendalam di bidang kebijakan fiskal dan pembangunan berkelanjutan. Sebagai konsultan ekonomi bersertifikat, ia telah bekerja sama dengan pemerintah, organisasi internasional, dan sektor swasta untuk merumuskan solusi inovatif dalam menghadapi tantangan ekonomi global.",
      fee: 50000,
      skill: "Melayani Konsultasi Hukum Keuangan, Konsultasi Hukum Properti",
    },
    {
      id: "3",
      name: "Dr. Andria Pratama",
      image:
        "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Dr. Andria Pratama adalah seorang pakar hukum yang berpengalaman luas dalam memberikan konsultasi hukum profesional. Ia meraih gelar Sarjana Hukum (SH) dari Universitas Gadjah Mada dengan predikat cum laude dan melanjutkan studi Magister Hukum (MH) di Universitas Leiden, Belanda, dengan spesialisasi Hukum Bisnis Internasional. Selain itu, Dr. Andria juga menyelesaikan program Doktoral (Ph.D.) di Universitas Melbourne dengan fokus penelitian pada arbitrase internasional. Sebagai konsultan hukum bersertifikat, ia aktif membantu individu maupun perusahaan dalam menyelesaikan permasalahan hukum yang kompleks, dengan pendekatan yang profesional dan solutif.",
      fee: 50000,
      skill:
        "Melayani Konsultasi Hukum Ketenagakerjaan, Konsultasi Hukum Perkawinan",
    },
  ];

  // const [selectedLawyer, setSelectedLawyer] = useState("");
  const [selectedLawyerId, setSelectedLawyerId] = useState("");
  // const [selectedLawyerName, setSelectedLawyerName] = useState("string");
  // const [selectedLawyerBio, setSelectedLawyerBio] = useState("string");
  // const [selectedLawyerImage, setSelectedLawyerImage] = useState("string");

  const router = useRouter();
  // const searchParamsData = useSearchParams();

  function handleSubmit() {
    const searchParamsData = new URLSearchParams();

    searchParamsData.append("lawyerId", selectedLawyerId);

    router.push(`/konsultasi?${searchParamsData.toString()}`);
  }

  return (
    <>
      <div className="flex justify-center p-5 gap-6 mt-20">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <Image src={lawyer.image} alt="Photo" width={320} height={520} />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">{lawyer.name}</h2>
              <p>{lawyer.skill}</p>

              <div className="card-actions justify-center p-5">
                <button
                  onClick={() => setSelectedLawyerId(lawyer.id)}
                  aria-pressed={selectedLawyerId === lawyer.id}
                  className={`btn ${
                    selectedLawyerId === lawyer.id
                      ? "bg-gray-400 text-white"
                      : ""
                  } hover:bg-gray-400 active:scale-95 transition-all duration-200 ease-in-out`}
                >
                  Booking Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-actions justify-center p-5">
        <button onClick={handleSubmit} className="btn btn-primary">
          Lanjut ke tahap berikutnya
        </button>
      </div>
    </>
  );
}
