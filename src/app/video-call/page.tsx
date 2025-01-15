"use client";

import { useEffect, useRef, useState } from "react";
import { createPeerConnection, createRoom, joinRoom } from "@/lib/webrtc";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const VideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [videoRoomId, setVideoRoomId] = useState<string | null>(null);
  const router = useRouter();

  const startCall = async () => {
    if (!peerConnection) return;

    const id = await createRoom(peerConnection);

    setVideoRoomId(id);

    // console.log("Room ID:", id);
  };

  const joinCall = async () => {
    if (!peerConnection) return;

    let id = prompt("Enter Room ID:");
    if (!id) return;

    id = id.trim();
    if (id.includes("/") || id.includes("http://") || id.includes("https://")) {
      alert("Invalid Room ID. Please enter a valid ID.");
      return;
    }

    if (!peerConnection) {
      console.error("Peer connection is not initialized.");
      return;
    }

    await joinRoom(peerConnection, id);
    console.log("Joined Room ID:", id);
  };

  const startMedia = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      // console.log("INI LOCACL VIDEO ELEMENT :", localVideoRef.current);
    } else {
      console.log("LOCAL VIDEO GAADA BOY");
    }

    const pc = createPeerConnection();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    setPeerConnection(pc);
  };

  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const checkPremium = async () => {
    const response = await fetch("/api/clientid");
    const { clientId } = await response.json();

    if (!clientId) router.push("/login");

    const data = await fetch("/api/check-premium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
      }),
    });

    const result = await data.json();
    const isPremium = result?.data;

    if (!isPremium) {
      toast.error("Silahkan Berlangganan Dulu");
      router.push("/?scroll=subscribe");
    }

    return null;
  };

  useEffect(() => {
    checkPremium();
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] bg-slate-900 text-white px-8 flex items-center">
      <div className="container mx-auto max-w-7xl -mt-20">
        <h1 className="text-4xl font-bold mb-8">Video Conference</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-[16/10] bg-slate-800 rounded-xl overflow-hidden">
            <video ref={localVideoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">Anda</div>
          </div>
          <div className="relative aspect-[16/10] bg-slate-800 rounded-xl overflow-hidden">
            <video ref={remoteVideoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">Lawan Bicara</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={startMedia} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors">
            Mulai Media
          </button>
          <button onClick={startCall} disabled={!peerConnection} className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium rounded-lg transition-colors">
            Buat Room
          </button>
          <button onClick={joinCall} disabled={!peerConnection} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium rounded-lg transition-colors">
            Join Room
          </button>
          <button onClick={endCall} disabled={!peerConnection} className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium rounded-lg transition-colors">
            Akhiri Call
          </button>
        </div>

        <AnimatePresence>
          {videoRoomId && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: "easeOut" }} className="bg-slate-800 p-6 rounded-xl mx-auto max-w-2xl">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg mb-2">
                Room ID:
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-mono bg-slate-700 p-3 rounded-lg break-all">
                {videoRoomId}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoCall;
