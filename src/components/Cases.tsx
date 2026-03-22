"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Counter animation hook                                            */
/* ------------------------------------------------------------------ */

function useCounterAnimation(
  target: number,
  suffix: string,
  isInView: boolean,
  duration = 1400
) {
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (!isInView) return;

    let start: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(current + suffix);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, suffix, duration]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Metric component                                                  */
/* ------------------------------------------------------------------ */

interface MetricDef {
  value: string;
  label: string;
}

function AnimatedMetric({
  value,
  label,
  isInView,
}: {
  value: string;
  label: string;
  isInView: boolean;
}) {
  // Parse the value to decide if we animate or show static
  const parsed = parseMetricValue(value);

  const animated = useCounterAnimation(
    parsed.number,
    parsed.suffix,
    parsed.shouldAnimate ? isInView : false
  );

  const displayValue = parsed.shouldAnimate ? animated : value;

  return (
    <div>
      <div className="text-2xl font-semibold text-[#F0F0F5]">
        {displayValue}
      </div>
      <div className="text-xs text-[#7A7A85]">{label}</div>
    </div>
  );
}

function parseMetricValue(value: string): {
  number: number;
  suffix: string;
  shouldAnimate: boolean;
} {
  // "24/7" or "0" -> static
  if (value === "24/7" || value === "0") {
    return { number: 0, suffix: "", shouldAnimate: false };
  }

  // "40%" -> animate 0-40 + "%"
  const percentMatch = value.match(/^(\d+)(%)/);
  if (percentMatch) {
    return {
      number: parseInt(percentMatch[1], 10),
      suffix: percentMatch[2],
      shouldAnimate: true,
    };
  }

  // "3seg" -> animate 0-3 + "seg"
  const suffixMatch = value.match(/^(\d+)(\D+)$/);
  if (suffixMatch) {
    return {
      number: parseInt(suffixMatch[1], 10),
      suffix: suffixMatch[2],
      shouldAnimate: true,
    };
  }

  return { number: 0, suffix: "", shouldAnimate: false };
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface CaseData {
  badge: string;
  title: string;
  problem: string;
  solution: string;
  metrics: MetricDef[];
}

const cases: CaseData[] = [
  {
    badge: "Hostelería",
    title: "Un hotel boutique que perdía reservas cada noche",
    problem:
      "El hotel recibía consultas por WhatsApp, email y su web a todas horas, pero solo podían responder en horario de oficina. Para cuando contestaban, el cliente ya había reservado en otro sitio.",
    solution:
      "Creamos un asistente virtual que responde al instante en los tres canales, resuelve dudas sobre disponibilidad, precios y servicios, y completa la reserva sin intervención humana.",
    metrics: [
      { value: "40%", label: "más reservas" },
      { value: "3seg", label: "tiempo respuesta" },
      { value: "24/7", label: "disponibilidad" },
    ],
  },
  {
    badge: "Ecommerce",
    title: "Una tienda online ahogada en trabajo manual",
    problem:
      "Cada pedido requería actualizar stock a mano, enviar confirmaciones, generar etiquetas de envío y responder las mismas preguntas una y otra vez. El equipo no daba abasto.",
    solution:
      "Automatizamos todo el flujo post-venta: confirmación automática, actualización de inventario en tiempo real, generación de etiquetas y un chatbot que resuelve el 80% de las consultas sin intervención.",
    metrics: [
      { value: "6h", label: "ahorradas/día" },
      { value: "80%", label: "consultas auto" },
      { value: "0", label: "errores de stock" },
    ],
  },
  {
    badge: "Legal",
    title: "Un bufete que tardaba días en analizar contratos",
    problem:
      "Revisar un contrato complejo llevaba entre 2 y 4 horas de un abogado senior. Con 30+ contratos por semana, el equipo vivía desbordado y los clientes esperaban demasiado.",
    solution:
      "Implementamos un sistema de IA que lee, analiza y resume contratos en minutos, destacando cláusulas de riesgo y comparando con plantillas estándar. El abogado revisa el resumen, no las 50 páginas.",
    metrics: [
      { value: "15min", label: "por contrato" },
      { value: "90%", label: "menos tiempo" },
      { value: "99%", label: "precisión" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease, delay: i * 0.15 },
  }),
};

/* ------------------------------------------------------------------ */
/*  Card component                                                    */
/* ------------------------------------------------------------------ */

function CaseCard({ data, index }: { data: CaseData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="max-w-sm w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-8"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
    >
      {/* Badge */}
      <span className="inline-block text-xs uppercase tracking-[0.15em] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] rounded-full px-4 py-1.5 mb-6">
        {data.badge}
      </span>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#F0F0F5] mb-6">
        {data.title}
      </h3>

      {/* Problem */}
      <p className="text-xs uppercase tracking-[0.15em] text-[#7A7A85] mb-2">
        El problema
      </p>
      <p className="text-[15px] text-[#7A7A85] mb-6">{data.problem}</p>

      {/* Solution */}
      <p className="text-xs uppercase tracking-[0.15em] text-[#F0F0F5] opacity-60 mb-2">
        Qué construimos
      </p>
      <p className="text-[15px] text-[#F0F0F5] opacity-80 mb-8">
        {data.solution}
      </p>

      {/* Metrics */}
      <div className="flex gap-8 border-t border-[rgba(255,255,255,0.06)] pt-6">
        {data.metrics.map((m, i) => (
          <AnimatedMetric
            key={i}
            value={m.value}
            label={m.label}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                      */
/* ------------------------------------------------------------------ */

export default function Cases() {
  return (
    <section id="casos" className="relative z-10 py-32 px-6">
      {/* Header */}
      <div className="text-center">
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-[#C9A84C] opacity-60 mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          Resultados reales
        </motion.p>

        <motion.h2
          className="font-extralight tracking-[0.04em]"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Casos de éxito
        </motion.h2>

        {/* Decorative gold line */}
        <motion.div
          className="h-[1px] bg-[#C9A84C] opacity-30 mx-auto mt-4 mb-20"
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {cases.map((c, i) => (
          <CaseCard key={i} data={c} index={i} />
        ))}
      </div>
    </section>
  );
}
