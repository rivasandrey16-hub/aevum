"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    image: "automation.jpeg",
    title: "Automatización de operaciones",
    description:
      "Le quitamos de encima a tu equipo las tareas repetitivas que nadie quiere hacer. Desde procesar facturas hasta gestionar inventario, la IA se encarga para que tu gente se dedique a lo que realmente mueve el negocio.",
  },
  {
    image: "agents.jpeg",
    title: "Agentes de IA especializados",
    description:
      "Agentes inteligentes que atienden a tus clientes, resuelven dudas y gestionan solicitudes a cualquier hora. Como sumar a tu equipo a alguien que nunca se cansa y siempre tiene la respuesta.",
  },
  {
    image: "analytics.jpeg",
    title: "Análisis predictivo y dashboards",
    description:
      "Tus datos ya te est\u00e1n diciendo cosas \u2014 nosotros te ayudamos a escucharlos. Dashboards claros que te muestran hacia d\u00f3nde va tu negocio antes de que llegue ah\u00ed.",
  },
  {
    image: "integrations.jpeg",
    title: "Arquitectura e integraciones",
    description:
      "Hacemos que tus herramientas se entiendan entre s\u00ed. Tu CRM, tu ERP, tu web \u2014 todo conectado y movi\u00e9ndose en la misma direcci\u00f3n.",
  },
  {
    image: "consulting.jpeg",
    title: "Consultor\u00eda estrat\u00e9gica",
    description:
      "Nos sentamos contigo y te decimos, con honestidad, d\u00f3nde la IA te va a dar resultados y d\u00f3nde no. Sin humo, sin jerga \u2014 un plan claro que puedas ejecutar ma\u00f1ana.",
  },
  {
    image: "content.jpeg",
    title: "Contenido y creatividad con IA",
    description:
      "Contenido, im\u00e1genes y materiales de marketing creados con IA y con criterio. M\u00e1s volumen, m\u00e1s velocidad, pero siempre con la voz y la personalidad de tu marca.",
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
          Inteligencia artificial aplicada a lo que de verdad importa
          en tu negocio.
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
