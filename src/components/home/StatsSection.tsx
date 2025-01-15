"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineScale, HiOutlineClock, HiOutlineUsers } from "react-icons/hi";
import CountUp from "react-countup";

const stats = [
  {
    icon: HiOutlineScale,
    value: 850,
    label: "Cases Won",
    suffix: "+",
  },
  {
    icon: HiOutlineClock,
    value: 5,
    label: "Years Experience",
    suffix: "+",
  },
  {
    icon: HiOutlineUsers,
    value: 2500,
    label: "Happy Clients",
    suffix: "+",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, staggerChildren: 0.2 },
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="group relative bg-white/5 rounded-2xl p-8
                                     border border-white/10 hover:border-amber-500/50
                                     transition-all duration-300 hover:bg-white/10"
            >
              <div className="relative z-10">
                <stat.icon className="w-12 h-12 text-amber-400 mb-4 transform group-hover:scale-110 transition-transform duration-300" />

                <div className="font-lora text-4xl font-bold text-white mb-2 flex items-end gap-1">
                  {isInView && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                  )}
                  <span>{stat.suffix}</span>
                </div>

                <p className="text-white/80 text-lg relative inline-block">
                  {stat.label}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 
                                                   group-hover:w-full"
                  />
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}