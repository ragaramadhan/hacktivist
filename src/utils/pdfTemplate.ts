"use client";

import { jsPDF } from "jspdf";

export function createPDFTemplate(logoUrl: string, name: string) {
  // Initialize PDF with proper settings

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add logo
  if (logoUrl) {
    pdf.addImage(logoUrl, "PNG", 160, 10, 30, 25); // Adjust position and size as needed
  }

  const consultationDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Set default font
  pdf.setFont("helvetica", "bold");

  // Header dengan styling yang menarik
  pdf.setFontSize(22);
  pdf.setTextColor(0, 51, 102); // Warna biru tua yang profesional
  pdf.text("SURAT PERMOHONAN", 105, 25, { align: "center" });
  pdf.text("KONSULTASI HUKUM", 105, 35, { align: "center" });

  // Garis pembatas dekoratif
  pdf.setDrawColor(0, 51, 102);
  pdf.setLineWidth(0.5);
  pdf.line(20, 40, 190, 40);

  // Nomor surat
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(`Nomor: ${new Date().getFullYear()}/KH/${String(new Date().getMonth() + 1).padStart(2, "0")}/001`, 20, 50);

  // Tanggal surat (di kanan)
  pdf.text(`Jakarta, ${consultationDate}`, 190, 50, { align: "right" });

  // Penerima surat
  pdf.setFont("helvetica", "normal");
  pdf.text(["Kepada Yth,", "Kantor Hacktivist", "di Jakarta"], 20, 60);

  // Pembuka
  pdf.text("Dengan hormat,", 20, 85);

  // Data pemohon
  pdf.text(["Yang bertanda tangan di bawah ini:", "", `Nama\t\t\t: ${name}`], 20, 95);

  // Isi surat
  pdf.setFont("helvetica", "normal");
  const content = ["Dengan ini mengajukan permohonan untuk melakukan konsultasi hukum mengenai:", "", "1. Penjelasan mengenai prosedur hukum yang berlaku", "2. Analisis terhadap kasus yang sedang dihadapi", "3. Saran dan rekomendasi penyelesaian masalah", "4. Pendampingan hukum jika diperlukan", "", "Adapun dokumen-dokumen pendukung terlampir bersama surat ini untuk dapat diperiksa.", "", "Besar harapan saya dapat segera melakukan konsultasi dengan Bapak sesuai dengan jadwal", "yang dapat disepakati bersama.", "", "Demikian surat permohonan ini saya sampaikan. Atas perhatian dan kesediaan Bapak,", "saya mengucapkan terima kasih."];

  pdf.text(content, 20, 125);

  // Bagian penanda tangan
  pdf.text("Hormat saya,", 20, 210);

  // Kotak tanda tangan dengan styling
  pdf.setDrawColor(0, 51, 102);
  pdf.setLineWidth(0.5);
  pdf.rect(20, 220, 50, 25);

  // Nama penanda tangan
  pdf.setFont("helvetica", "bold");
  pdf.text(`(${name})`, 20, 255);

  // Footer
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(["Dokumen ini adalah sah dan diproses secara elektronik", "Tidak memerlukan tanda tangan basah"], 105, 280, { align: "center" });

  return pdf;
}

export function addSignatureToPDF(pdf: jsPDF, signatureImage: string) {
  // Tambahkan tanda tangan ke dalam kotak yang sudah disiapkan
  pdf.addImage(signatureImage, "PNG", 20, 220, 50, 25);
  return pdf;
}
