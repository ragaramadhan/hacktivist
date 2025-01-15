"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
    IoMicOutline, 
    IoMicOffOutline,
    IoVideocamOutline,
    IoVideocamOffOutline,
    IoCloseOutline,
    IoVolumeHighOutline,
    IoVolumeMuteOutline
} from "react-icons/io5"

interface VideoCallModalProps {
    isOpen: boolean
    onClose: () => void
    lawyer: {
        name: string
        avatar: string
        specialization: string
    }
}

export default function VideoCallModal({ isOpen, onClose, lawyer }: VideoCallModalProps) {
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [isSpeakerOff, setIsSpeakerOff] = useState(false)
    const [callDuration, setCallDuration] = useState(0)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [error, setError] = useState<string>("")
    
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        let timer: NodeJS.Timeout
        
        const startVideoCall = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                setStream(mediaStream)
                
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream
                }

                // Start timer
                timer = setInterval(() => {
                    setCallDuration(prev => prev + 1)
                }, 1000)
                
            } catch (err) {
                setError("Gagal mengakses kamera/mikrofon. Mohon berikan izin akses.")
                console.error("Media Device Error:", err)
            }
        }

        if (isOpen) {
            startVideoCall()
        }

        return () => {
            // Cleanup
            if (timer) clearInterval(timer)
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
            setCallDuration(0)
            setError("")
        }
    }, [isOpen])

    // Handle Mic Toggle
    const toggleMic = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0]
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled
                setIsMuted(!audioTrack.enabled)
            }
        }
    }

    // Handle Video Toggle
    const toggleVideo = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0]
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled
                setIsVideoOff(!videoTrack.enabled)
            }
        }
    }

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleClose = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
        }
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden"
                    >
                        {error ? (
                            <div className="p-6 text-center">
                                <p className="text-red-500 mb-4">{error}</p>
                                <button 
                                    onClick={handleClose}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                >
                                    Tutup
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Main Video Area */}
                                <div className="relative aspect-video bg-slate-800">
                                    {/* Lawyer's Video (dummy) */}
                                    <Image
                                        src={lawyer.avatar}
                                        alt={lawyer.name}
                                        fill
                                        className="object-cover opacity-90"
                                        unoptimized
                                    />
                                    
                                    {/* User's Video Preview */}
                                    <div className="absolute bottom-4 right-4 w-48 aspect-video bg-slate-700 rounded-xl overflow-hidden border-2 border-slate-600">
                                        {!isVideoOff ? (
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                                <IoVideocamOffOutline className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Call Duration */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 rounded-full">
                                        <span className="text-white text-sm">
                                            {formatDuration(callDuration)}
                                        </span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={lawyer.avatar}
                                            alt={lawyer.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                            unoptimized
                                        />
                                        <div>
                                            <h3 className="text-white font-medium">{lawyer.name}</h3>
                                            <p className="text-gray-400 text-sm">{lawyer.specialization}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Mic Toggle */}
                                        <button 
                                            onClick={toggleMic}
                                            className={`p-3 rounded-full ${
                                                isMuted ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-white hover:bg-slate-700'
                                            }`}
                                        >
                                            {isMuted ? (
                                                <IoMicOffOutline className="w-6 h-6" />
                                            ) : (
                                                <IoMicOutline className="w-6 h-6" />
                                            )}
                                        </button>

                                        {/* Video Toggle */}
                                        <button 
                                            onClick={toggleVideo}
                                            className={`p-3 rounded-full ${
                                                isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-white hover:bg-slate-700'
                                            }`}
                                        >
                                            {isVideoOff ? (
                                                <IoVideocamOffOutline className="w-6 h-6" />
                                            ) : (
                                                <IoVideocamOutline className="w-6 h-6" />
                                            )}
                                        </button>

                                        {/* Speaker Toggle */}
                                        <button 
                                            onClick={() => setIsSpeakerOff(prev => !prev)}
                                            className={`p-3 rounded-full ${
                                                isSpeakerOff ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-white hover:bg-slate-700'
                                            }`}
                                        >
                                            {isSpeakerOff ? (
                                                <IoVolumeMuteOutline className="w-6 h-6" />
                                            ) : (
                                                <IoVolumeHighOutline className="w-6 h-6" />
                                            )}
                                        </button>

                                        {/* End Call */}
                                        <button 
                                            onClick={handleClose}
                                            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
                                        >
                                            <IoCloseOutline className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 