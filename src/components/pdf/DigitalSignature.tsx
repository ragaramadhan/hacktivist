"use client";

import React, { useRef, useState } from "react";

interface DigitalSignatureProps {
  onSave: (signatureImage: string) => void;
}

const DigitalSignature: React.FC<DigitalSignatureProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) context.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#000";
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signatureImage = canvas.toDataURL("image/png");
      onSave(signatureImage);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="digital-signature">
      <canvas ref={canvasRef} width={300} height={150} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} className="border border-gray-300" />
      <div className="mt-4 space-x-2">
        <button onClick={saveSignature} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Signature
        </button>
        <button onClick={clearSignature} className="px-4 py-2 bg-gray-300 text-black rounded">
          Clear
        </button>
      </div>
    </div>
  );
};

export default DigitalSignature;
