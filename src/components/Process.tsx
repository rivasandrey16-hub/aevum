"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    badge: "1 semana",
    description:
      "Nos sentamos contigo (virtual o presencialmente) y analizamos cómo funciona tu negocio por dentro. Identificamos dónde se pierde tiempo, dónde hay cuellos de botella y dónde la inteligencia artificial puede tener mayor impacto. Te entregamos un informe claro con oportunidades concretas, sin compromiso.",
  },
  {
    number: "02",
    title: "Diseño de la solución",
    badge: "1-2 semanas",
    description:
      "Con el diagnóstico en mano, diseñamos una solución a medida. No vendemos paquetes genéricos — cada propuesta se adapta a tu realidad, tu presupuesto y tus objetivos. Te explicamos todo en lenguaje humano: qué vamos a hacer, por qué, y qué resultados esperar.",
  },
  {
    number: "03",
    title: "Implementación",
    badge: "2-6 semanas",
    description:
      "Construimos e integramos la solución en tu operación real. Trabajamos en sprints cortos con demos frecuentes para que veas el progreso y puedas dar feedback en cada paso. Nada se lanza sin tu aprobación.",
  },
  {
    number: "04",
    title: "Optimización continua",
    badge: "Permanente",
    description:
      "Una vez en producción, monitorizamos el rendimiento y ajustamos. La IA mejora con el tiempo y nosotros nos aseguramos de que cada mejora se aplique. Informes mensuales claros para que siempre sepas qué está pasando.",
  },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Process() {
  return (
    <section
      id="proceso"
      className="relative z-10 bg-[#0A0A0D] py-32 px-6"
    >
      {/* Title area */}
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#C9A84C] opacity-60 mb-4">
          Cómo trabajamos
        </p>
        <h2
          className="font-extralight tracking-[0.04em] text-[#F0F0F5]"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Proceso
        </h2>
        <motion.div
          className="h-[1px] bg-[#C9A84C] opacity-30 mx-auto mt-4 mb-20"
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easing }}
        />
      </div>

      {/* Steps */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical gold line connecting all steps */}
        <div
          className="absolute left-6 top-6 bottom-6 w-[1px]"
          style={{
            background:
              "linear-gradient(to bottom, #C9A84C, transparent)",
          }}
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="relative flex gap-8 mb-16 last:mb-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 1.2,
              ease: easing,
              delay: index * 0.2,
            }}
          >
            {/* Step number */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 rounded-[14px] border border-[rgba(201,168,76,0.2)] bg-[#0A0A0D] flex items-center justify-center text-[#C9A84C] font-light text-lg">
                {step.number}
              </div>
            </div>

            {/* Content */}
            <div className="pt-1">
              <div className="flex items-center flex-wrap gap-y-2">
                <h3 className="text-xl font-semibold text-[#F0F0F5]">
                  {step.title}
                </h3>
                <span className="text-xs border border-[rgba(201,168,76,0.2)] text-[#C9A84C] rounded-full px-3 py-1 ml-3">
                  {step.badge}
                </span>
              </div>
              <p className="text-[15px] text-[#7A7A85] mt-3 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
