"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-[#F0F0F5] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[800px]">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/aevum"
            className="inline-flex items-center gap-2 text-sm text-[#7A7A85] hover:text-[#C9A84C] transition-colors mb-12"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver a AEVUM
          </Link>
        </motion.div>

        {/* Title */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
          className="mb-14"
        >
          <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-4">
            AEVUM
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-[#7A7A85] text-sm">
            Última actualización: marzo de 2026
          </p>
        </motion.header>

        {/* Sections */}
        <div className="space-y-12">
          {/* 1. Objeto */}
          <Section index={1} title="1. Objeto">
            <p>
              Los presentes Términos y Condiciones regulan el acceso y uso del
              sitio web de <strong className="text-[#C9A84C]">AEVUM</strong>,
              una agencia especializada en consultoría e integración de
              inteligencia artificial para empresas y profesionales. AEVUM opera
              bajo la marca comercial de Veqra y tiene como propósito ayudar a
              sus clientes a incorporar soluciones de IA de forma estratégica,
              eficiente y personalizada en sus procesos y operaciones.
            </p>
          </Section>

          {/* 2. Uso del sitio web */}
          <Section index={2} title="2. Uso del sitio web">
            <p>
              Al acceder a este sitio web, el usuario se compromete a utilizarlo
              de forma lícita y conforme a estos términos. Queda expresamente
              prohibido:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-[#7A7A85]">
              <li>
                Utilizar el contenido del sitio con fines ilegales o no
                autorizados.
              </li>
              <li>
                Intentar acceder a áreas restringidas del servidor o
                infraestructura del sitio.
              </li>
              <li>
                Reproducir, distribuir o modificar el contenido sin
                autorización previa y por escrito de AEVUM.
              </li>
              <li>
                Introducir virus, código malicioso o cualquier elemento que
                pueda dañar el funcionamiento del sitio.
              </li>
            </ul>
            <p className="mt-3">
              AEVUM se reserva el derecho de restringir el acceso a cualquier
              usuario que incumpla estas condiciones.
            </p>
          </Section>

          {/* 3. Servicios */}
          <Section index={3} title="3. Servicios">
            <p>
              AEVUM ofrece servicios de consultoría, diagnóstico e integración
              de inteligencia artificial adaptados a las necesidades de cada
              cliente. Entre las características principales de nuestros
              servicios se encuentran:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-[#7A7A85]">
              <li>
                <strong className="text-[#F0F0F5]">Diagnóstico gratuito:</strong>{" "}
                realizamos una evaluación inicial sin costo para entender las
                necesidades del cliente y proponer soluciones viables.
              </li>
              <li>
                <strong className="text-[#F0F0F5]">Sin permanencias:</strong>{" "}
                no exigimos contratos de permanencia mínima. El cliente es libre
                de continuar o finalizar la relación en cualquier momento.
              </li>
              <li>
                <strong className="text-[#F0F0F5]">Proyectos a medida:</strong>{" "}
                cada solución se diseña de forma personalizada según el contexto,
                los objetivos y los recursos del cliente.
              </li>
            </ul>
            <p className="mt-3">
              Los alcances, plazos y condiciones específicas de cada proyecto se
              acuerdan de forma individual entre AEVUM y el cliente antes de
              iniciar cualquier implementación.
            </p>
          </Section>

          {/* 4. Propiedad intelectual */}
          <Section index={4} title="4. Propiedad intelectual">
            <p>
              Todo el contenido presente en este sitio web — incluyendo, pero no
              limitado a, textos, diseños, logotipos, gráficos, imágenes,
              iconografía, código fuente y estructura visual — es propiedad
              exclusiva de AEVUM y/o Veqra, o se utiliza bajo licencia
              autorizada.
            </p>
            <p className="mt-3">
              Queda prohibida la reproducción total o parcial, distribución,
              transformación o comunicación pública de cualquier contenido del
              sitio sin la autorización expresa y por escrito de AEVUM.
            </p>
          </Section>

          {/* 5. Limitación de responsabilidad */}
          <Section index={5} title="5. Limitación de responsabilidad">
            <p>
              AEVUM se esfuerza por mantener la información del sitio web
              actualizada y precisa; sin embargo, no garantiza la ausencia de
              errores, interrupciones o inexactitudes en el contenido publicado.
            </p>
            <p className="mt-3">
              AEVUM no será responsable por daños directos o indirectos que
              puedan derivarse del uso del sitio web, de la imposibilidad de
              acceso al mismo, ni de la aplicación de la información aquí
              contenida sin el acompañamiento profesional correspondiente.
            </p>
            <p className="mt-3">
              Los resultados de cualquier proyecto de integración de IA dependen
              de múltiples factores, y AEVUM no garantiza resultados específicos
              derivados de sus servicios.
            </p>
          </Section>

          {/* 6. Formulario de contacto */}
          <Section index={6} title="6. Formulario de contacto y datos personales">
            <p>
              El sitio web de AEVUM puede incluir formularios de contacto a
              través de los cuales el usuario proporciona voluntariamente datos
              como su nombre, correo electrónico, empresa y mensaje.
            </p>
            <p className="mt-3">
              Estos datos se utilizan únicamente con el propósito de responder a
              la consulta del usuario y, en su caso, ofrecer información sobre
              los servicios de AEVUM. No se compartirán con terceros ni se
              utilizarán con fines comerciales distintos al motivo de la
              comunicación original.
            </p>
            <p className="mt-3">
              Para más información sobre el tratamiento de datos personales, el
              usuario puede contactarnos directamente a través de los canales
              indicados en la sección de contacto.
            </p>
          </Section>

          {/* 7. Enlaces a terceros */}
          <Section index={7} title="7. Enlaces a terceros">
            <p>
              Este sitio web puede contener enlaces a plataformas de terceros,
              como WhatsApp, Instagram, LinkedIn u otras redes sociales. Estos
              enlaces se proporcionan exclusivamente como una facilidad para el
              usuario.
            </p>
            <p className="mt-3">
              AEVUM no se hace responsable del contenido, las políticas de
              privacidad ni las prácticas de dichos sitios externos. El acceso a
              estos enlaces es bajo la entera responsabilidad del usuario.
            </p>
          </Section>

          {/* 8. Modificaciones */}
          <Section index={8} title="8. Modificaciones">
            <p>
              AEVUM se reserva el derecho de modificar, actualizar o ajustar
              estos Términos y Condiciones en cualquier momento y sin previo
              aviso. Las modificaciones entrarán en vigor desde el momento de su
              publicación en el sitio web.
            </p>
            <p className="mt-3">
              Se recomienda al usuario revisar periódicamente esta página para
              estar al tanto de posibles cambios. El uso continuado del sitio
              tras la publicación de modificaciones implica la aceptación de las
              mismas.
            </p>
          </Section>

          {/* 9. Ley aplicable */}
          <Section index={9} title="9. Ley aplicable y jurisdicción">
            <p>
              Estos Términos y Condiciones se rigen por la legislación vigente
              de la República de Colombia, país desde el cual AEVUM opera y
              presta sus servicios.
            </p>
            <p className="mt-3">
              Cualquier controversia que pudiera surgir en relación con el uso
              del sitio web o la interpretación de estos términos será sometida
              a los tribunales competentes de Colombia, renunciando las partes a
              cualquier otro fuero que pudiera corresponderles.
            </p>
          </Section>

          {/* 10. Contacto */}
          <Section index={10} title="10. Contacto">
            <p>
              Si tienes alguna pregunta, comentario o inquietud sobre estos
              Términos y Condiciones, o sobre cualquier aspecto de los servicios
              de AEVUM, no dudes en escribirnos:
            </p>
            <div className="mt-4 rounded-lg border border-[#1a1a2e] bg-[#0a0a12] p-5">
              <p className="text-sm text-[#7A7A85]">Correo electrónico</p>
              <a
                href="mailto:dentiaoficial@gmail.com"
                className="text-[#C9A84C] hover:underline transition-colors"
              >
                dentiaoficial@gmail.com
              </a>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={12}
          className="mt-20 pt-10 border-t border-[#1a1a2e] text-center text-sm text-[#7A7A85]"
        >
          <p>&copy; {new Date().getFullYear()} AEVUM by Veqra. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </main>
  );
}

function Section({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeIn}
      custom={index}
      className="space-y-1"
    >
      <h2 className="text-xl font-semibold mb-3 text-[#F0F0F5]">{title}</h2>
      <div className="text-[#7A7A85] leading-relaxed text-[15px]">
        {children}
      </div>
    </motion.section>
  );
}
