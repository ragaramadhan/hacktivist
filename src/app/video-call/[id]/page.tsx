"use client";

import { useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { createPeerConnection, createRoom, joinRoom } from "@/lib/webrtc";

const VideoCallId = () => {
  const params = useParams();
  const id = params.id;
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [videoRoomId, setVideoRoomId] = useState<string | null>(null);

  const startCall = async () => {
    if (!peerConnection) return;

    const id = await createRoom(peerConnection);

    setVideoRoomId(id);

    // console.log("Room ID:", id);
  };

  const joinCall = async () => {
    if (!peerConnection) return;

    if (Array.isArray(id)) return;

    if (!peerConnection) {
      console.error("Peer connection is not initialized.");
      return;
    }

    await joinRoom(peerConnection, id);
    // console.log("Joined Room ID:", id);
  };

  const startMedia = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      // console.log("INI LOCACL VIDEO ELEMENT :", localVideoRef.current);
    }
    // else {
      // console.log("LOCAL VIDEO GAADA BOY");
    // }

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

  useEffect(() => {
    const autoJoin = async () => {
      await startMedia();
      setTimeout(async () => {
        if (peerConnection) {
          await joinCall();
        }
      }, 1000);
    };

    autoJoin();

    return () => {
      endCall();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Video Conference</h1>
        <p className="text-gray-300 mb-8">
          Mulai video call atau join ke room yg udh ada dgn Room ID.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
              Kamu
            </div>
          </div>
          <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
              Lawan Bicara
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={startMedia}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
          >
            Mulai Media
          </button>
          <button
            onClick={startCall}
            disabled={!peerConnection}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium rounded-lg transition-colors"
          >
            Buat Room
          </button>
          <button
            onClick={joinCall}
            disabled={!peerConnection}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium rounded-lg transition-colors"
          >
            Join Room
          </button>
          <button
            onClick={endCall}
            disabled={!peerConnection}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium rounded-lg transition-colors"
          >
            Akhiri Call
          </button>
        </div>

        {videoRoomId && (
          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-lg mb-2">Room Link:</p>
            <p className="font-mono bg-slate-700 p-3 rounded-lg break-all">
              {`${window.location.origin}/video-call/${videoRoomId}`}
            </p>
          </div>
        )}

        {videoRoomId && (
          <p className="room-id">
            Room ID: <strong>{videoRoomId}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoCallId;
