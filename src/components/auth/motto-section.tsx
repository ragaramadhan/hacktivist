"use client"

import Lottie, { LottieComponentProps } from "lottie-react"
import justiceLottie from "@/assets/lottie/justice.json"

// Custom type utk props Lottie klo mau extend
type LottieProps = Partial<LottieComponentProps>

// Klo mau pake props di component
interface MottoSectionProps {
    lottieProps?: LottieProps
}

export default function MottoSection({ lottieProps }: MottoSectionProps = {}) {
    return (
        <div className="
            bg-white/10 
            backdrop-blur-xl 
            p-10 
            border 
            border-white/20 
            rounded-3xl 
            relative
            text-white 
            text-center 
            h-auto 
            overflow-hidden 
            flex
            flex-col
            items-center
            justify-center
            gap-6
        ">
            <div className="w-96 h-96 relative">
                <Lottie 
                    animationData={justiceLottie} 
                    loop={true}
                    className="w-full h-full"
                    {...lottieProps}
                />
            </div>
            
            <div className="space-y-4 relative">
                <h2 className="text-3xl font-lora">
                    Konsultasi Hukum Modern
                </h2>
                
                <p className="text-sm text-white/80 italic">
                    &quot;Mewujudkan keadilan dan kepastian hukum bagi seluruh lapisan masyarakat Indonesia&quot;
                </p>
            </div>
        </div>
    )
} 


//! bisa diganti logo