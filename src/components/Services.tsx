"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    image: "automation.jpeg",
    title: "Automatización de operaciones",
    description:
      "Eliminamos las tareas repetitivas que consumen horas de tu equipo. Desde procesar facturas hasta gestionar inventario, la IA se encarga para que tu gente se enfoque en lo que importa.",
  },
  {
    image: "agents.jpeg",
    title: "Agentes de IA autónomos",
    description:
      "Asistentes virtuales que trabajan 24/7 atendiendo clientes, resolviendo dudas y gestionando solicitudes. Como tener un empleado incansable que nunca necesita vacaciones.",
  },
  {
    image: "analytics.jpeg",
    title: "Análisis predictivo y dashboards",
    description:
      "Convertimos tus datos en decisiones claras. Dashboards que te muestran qué va a pasar antes de que pase, para que siempre vayas un paso adelante.",
  },
  {
    image: "integrations.jpeg",
    title: "Arquitectura e integraciones",
    description:
      "Conectamos todas tus herramientas para que hablen entre sí. Tu CRM, tu ERP, tu web — todo sincronizado y funcionando como un reloj.",
  },
  {
    image: "consulting.jpeg",
    title: "Consultoría estratégica",
    description:
      "Te ayudamos a entender dónde la IA puede marcar la diferencia real en tu negocio. Sin humo, sin promesas vacías — solo un plan claro y ejecutable.",
  },
  {
    image: "content.jpeg",
    title: "Contenido y creatividad con IA",
    description:
      "Generación de contenido, imágenes y materiales de marketing potenciados por IA. Más contenido, más rápido, sin perder la esencia de tu marca.",
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
          Soluciones de inteligencia artificial diseñadas para resolver problemas
          reales de tu negocio.
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
