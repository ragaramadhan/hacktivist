"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";

import DigitalSignature from "./DigitalSignature";
import Image from "next/image";

const SignaturePage: React.FC = () => {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const handleSaveSignature = (image: string) => {
    setSignatureImage(image);
  };

  const generatePDF = () => {
    if (signatureImage) {
      const pdf = new jsPDF();
      pdf.addImage(signatureImage, "PNG", 10, 10, 50, 25);
      pdf.save("signature.pdf");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Digital Signature</h1>
      <DigitalSignature onSave={handleSaveSignature} />
      {signatureImage && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <Image src={signatureImage} alt="Signature" className="border border-gray-300" width={500} height={250} />
          <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            Generate PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SignaturePage;
