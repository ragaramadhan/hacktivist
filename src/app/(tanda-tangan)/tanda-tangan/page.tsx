"use client";

import { useEffect, useState } from "react";
import DigitalSignature from "@/components/pdf/DigitalSignature";
import { createPDFTemplate, addSignatureToPDF } from "@/utils/pdfTemplate";
import { useRouter } from "next/navigation";

export default function Page() {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [name, Setname] = useState<string>("");
  const router = useRouter();
  const handleSaveSignature = (image: string) => {
    setSignatureImage(image);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userlogin`, {
      method: "GET",
    });
    const data = await response.json();
    // console.log(data);
    Setname(data.username);
  };
  const logo: string = "https://res.cloudinary.com/dztilubhi/image/upload/v1736263087/hacktivist/hacktivist_logo_black_transparentbg.png";
  const handlePreviewPDF = () => {
    if (signatureImage) {
      // Buat template PDF
      const pdf = createPDFTemplate(logo, name);

      // Tambahkan tanda tangan
      addSignatureToPDF(pdf, signatureImage);

      // Buat preview PDF
      const pdfData = pdf.output("datauristring");
      setPdfPreview(pdfData);
    }
  };

  const generatePDF = () => {
    if (signatureImage) {
      const pdf = createPDFTemplate(logo, name);
      addSignatureToPDF(pdf, signatureImage);
      pdf.save("surat-pernyataan.pdf");
    }
  };

  const savePDFToDatabase = async () => {
    if (signatureImage) {
      setIsSaving(true);
      try {
        const pdf = createPDFTemplate(logo, name);
        addSignatureToPDF(pdf, signatureImage);
        const pdfData = pdf.output("datauristring");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/savePDF`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfData,
            filename: `surat-pernyataan-${Date.now()}.pdf`,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save PDF");
        }

        // const result = await response.json();
        // alert(`PDF berhasil disimpan ke database dengan ID: ${result.id}`);
        router.push("/");
      } catch (error) {
        console.error("Error saving PDF:", error);
        // alert("Gagal menyimpan PDF ke database");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Signature Area */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Tanda Tangan Digital</h1>

            <div className="space-y-8">
              {/* Signature Area */}
              <div className="bg-primary/5 p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Buat Tanda Tangan</h2>
                <DigitalSignature onSave={handleSaveSignature} />
              </div>

              {/* Signature Preview */}
              {signatureImage && (
                <div className="bg-primary/5 p-6 rounded-xl">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Preview Tanda Tangan:</h2>
                  <img src={signatureImage} alt="Signature" className="border-2 border-primary/20 rounded-xl max-w-[300px]" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button onClick={handlePreviewPDF} className="px-4 py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition-all disabled:opacity-50" disabled={!signatureImage}>
                  Preview PDF
                </button>
                <button onClick={generatePDF} className="px-4 py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition-all disabled:opacity-50" disabled={!signatureImage}>
                  Download PDF
                </button>
              </div>

              <button
                onClick={savePDFToDatabase}
                className={`w-full bg-primary text-white py-4 px-6 rounded-xl text-lg font-semibold
                  hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  ${isSaving ? "animate-pulse" : ""}`}
                disabled={!signatureImage || isSaving}
              >
                {isSaving ? "Menyimpan..." : "Selesai & Simpan"}
              </button>
            </div>
          </div>

          {/* Right Column - PDF Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Preview Dokumen</h2>
            {pdfPreview ? (
              <iframe src={pdfPreview} className="w-full h-[800px] rounded-xl border-2 border-primary/20" />
            ) : (
              <div className="h-[800px] rounded-xl border-2 border-primary/20 flex items-center justify-center">
                <p className="text-slate-500">Preview PDF akan muncul di sini setelah Anda membuat tanda tangan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
