"use client";

import { motion } from "framer-motion";

const KEYWORDS = [
  "AUTOMATIZACI\u00D3N",
  "AGENTES IA",
  "AN\u00C1LISIS",
  "INTEGRACI\u00D3N",
  "ESTRATEGIA",
];

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Capabilities() {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="relative z-10 border-y border-[rgba(255,255,255,0.03)] py-6"
    >
      <div className="flex flex-wrap items-center justify-center">
        {KEYWORDS.map((word, i) => (
          <span key={word} className="flex items-center">
            {i > 0 && (
              <span className="mx-4 text-[#C9A84C] opacity-30 md:mx-8">
                &middot;
              </span>
            )}
            <span className="text-xs uppercase tracking-[3px] text-[rgba(255,255,255,0.15)] md:text-sm">
              {word}
            </span>
          </span>
        ))}
      </div>
    </motion.section>
  );
}
