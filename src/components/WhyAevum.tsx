"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    display: "0",
    description:
      "Ataduras. Sin contratos de larga duraci\u00f3n. Te quedas porque quieres, no porque debas.",
  },
  {
    display: "100%",
    description:
      "Claridad. Sabes exactamente qu\u00e9 hacemos, c\u00f3mo lo hacemos y cu\u00e1nto cuesta. Sin sorpresas.",
  },
  {
    display: "Gratis",
    description:
      "El primer paso. Entendemos tu negocio antes de hablar de n\u00fameros. El diagn\u00f3stico inicial corre por nuestra cuenta.",
  },
  {
    display: "Tú",
    description:
      "Decides siempre. Cada paso requiere tu aprobación. Tu negocio, tus reglas.",
  },
];

const easing = [0.16, 1, 0.3, 1] as const;

export default function WhyAevum() {
  return (
    <section id="nosotros" className="relative z-10 py-32 px-6">
      {/* Title area */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.2, ease: easing }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.2em] text-[#C9A84C] mb-4"
        >
          La diferencia
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-extralight tracking-[0.04em] text-[#F0F0F5]"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Por qué AEVUM
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-[1px] bg-[#C9A84C] opacity-30 mx-auto mt-4 mb-20"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
        {differentiators.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easing, delay: 0.3 + i * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-4xl md:text-5xl font-extralight text-[#F0F0F5] mb-4">
              {item.display}
            </p>
            <p className="text-[15px] text-[#7A7A85]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
