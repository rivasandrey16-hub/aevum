"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    image: "automation.jpeg",
    title: "Automatización de operaciones",
    description:
      "Identificamos los procesos que drenan tiempo a tu equipo y los convertimos en flujos autónomos. Tu gente deja de ser operadora y vuelve a ser estratega.",
  },
  {
    image: "agents.jpeg",
    title: "Agentes de IA especializados",
    description:
      "Agentes de IA entrenados específicamente para tu industria. Entienden contexto, toman decisiones y ejecutan tareas complejas de forma autónoma — como un especialista dedicado que nunca descansa.",
  },
  {
    image: "analytics.jpeg",
    title: "Análisis predictivo y dashboards",
    description:
      "Transformamos datos dispersos en visión estratégica. Dashboards que anticipan tendencias y te permiten tomar decisiones con certeza, no con intuición.",
  },
  {
    image: "integrations.jpeg",
    title: "Arquitectura e integraciones",
    description:
      "Conectamos todos los sistemas de tu operación en un ecosistema unificado. CRM, ERP, plataformas — todo sincronizado y funcionando como un organismo.",
  },
  {
    image: "consulting.jpeg",
    title: "Consultor\u00eda estrat\u00e9gica",
    description:
      "Antes de construir, entendemos. Mapeamos tu operación, identificamos oportunidades reales y te entregamos una hoja de ruta ejecutable — sin promesas vacías.",
  },
  {
    image: "content.jpeg",
    title: "Contenido y creatividad con IA",
    description:
      "Producción de contenido, imágenes y piezas de comunicación potenciadas por IA. Mayor volumen sin sacrificar la identidad de tu marca — escalamos tu creatividad.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative z-10 bg-[#0A0A0D] py-32 px-6">
      {/* Title area */}
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#C9A84C] opacity-60 mb-4">
          Lo que hacemos
        </p>
        <h2
          className="font-extralight tracking-[0.04em] text-[#F0F0F5]"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Servicios
        </h2>
        <motion.div
          className="h-[1px] bg-[#C9A84C] opacity-30 mx-auto mt-4 mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <p className="text-[#7A7A85] max-w-2xl mx-auto text-center mb-20">
          No vendemos tecnología por vender. Cada intervención resuelve
          un problema real de tu operación.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "rgba(201,168,76,0.15)",
              transition: { duration: 0.5 },
            }}
          >
            {/* Image area */}
            <div className="aspect-[16/10] relative">
              <Image
                src={`/aevum/images/${service.image}`}
                fill
                className="object-cover"
                alt={service.title}
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>

            {/* Content area */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#F0F0F5] mb-3">
                {service.title}
              </h3>
              <p className="text-[15px] text-[#7A7A85] leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
