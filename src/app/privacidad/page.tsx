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

export default function PrivacidadPage() {
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
          className="mb-16"
        >
          <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-4">
            AEVUM
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pol&iacute;tica de Privacidad
          </h1>
          <p className="text-[#7A7A85] text-sm">
            &Uacute;ltima actualizaci&oacute;n: Marzo 2026
          </p>
        </motion.header>

        {/* Sections */}
        <div className="space-y-12">
          {/* 1. Responsable del tratamiento */}
          <Section index={1} title="1. Responsable del tratamiento">
            <p>
              El responsable del tratamiento de los datos personales recogidos a
              trav&eacute;s de este sitio web es <strong>AEVUM</strong>, una agencia
              especializada en la integraci&oacute;n de soluciones de inteligencia
              artificial para empresas y profesionales.
            </p>
            <p>
              Para cualquier consulta relacionada con la protecci&oacute;n de datos,
              puedes contactarnos a trav&eacute;s del correo electr&oacute;nico{" "}
              <a
                href="mailto:dentiaoficial@gmail.com"
                className="text-[#C9A84C] hover:underline"
              >
                dentiaoficial@gmail.com
              </a>
              .
            </p>
          </Section>

          {/* 2. Datos que recopilamos */}
          <Section index={2} title="2. Datos que recopilamos">
            <p>
              A trav&eacute;s de nuestro formulario de contacto, recopilamos
              &uacute;nicamente la informaci&oacute;n que t&uacute; nos proporcionas
              de forma voluntaria:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7A7A85] ml-2">
              <li>Nombre de la empresa u organizaci&oacute;n</li>
              <li>Direcci&oacute;n de correo electr&oacute;nico</li>
              <li>Contenido del mensaje enviado a trav&eacute;s del formulario</li>
            </ul>
            <p>
              No recopilamos datos de forma autom&aacute;tica ni utilizamos
              herramientas de an&aacute;lisis que identifiquen personalmente a los
              visitantes.
            </p>
          </Section>

          {/* 3. Finalidad del tratamiento */}
          <Section index={3} title="3. Finalidad del tratamiento">
            <p>Los datos personales que nos facilitas se utilizan para:</p>
            <ul className="list-disc list-inside space-y-2 text-[#7A7A85] ml-2">
              <li>
                Responder a tus consultas y solicitudes de informaci&oacute;n.
              </li>
              <li>
                Enviarte informaci&oacute;n relevante sobre nuestros servicios de
                integraci&oacute;n de IA, siempre que lo hayas solicitado.
              </li>
              <li>
                Gestionar la relaci&oacute;n comercial que pueda derivarse de tu
                contacto.
              </li>
            </ul>
            <p>
              En ning&uacute;n caso utilizaremos tus datos para fines distintos a
              los indicados sin tu consentimiento previo.
            </p>
          </Section>

          {/* 4. Base legal */}
          <Section index={4} title="4. Base legal del tratamiento">
            <p>
              La base legal para el tratamiento de tus datos personales es el{" "}
              <strong>consentimiento expl&iacute;cito</strong> que otorgas al
              completar y enviar el formulario de contacto de nuestro sitio web.
            </p>
            <p>
              Puedes retirar tu consentimiento en cualquier momento, sin que ello
              afecte a la licitud del tratamiento realizado con anterioridad,
              poni&eacute;ndote en contacto con nosotros a trav&eacute;s del correo
              indicado.
            </p>
          </Section>

          {/* 5. Destinatarios */}
          <Section index={5} title="5. Destinatarios de los datos">
            <p>
              Para gestionar el env&iacute;o de los mensajes del formulario de
              contacto, utilizamos el servicio{" "}
              <strong>EmailJS</strong> como procesador externo de correos
              electr&oacute;nicos. Este servicio act&uacute;a como encargado del
              tratamiento y procesa los datos exclusivamente para la finalidad de
              entrega del mensaje.
            </p>
            <p>
              <strong>No vendemos, alquilamos ni compartimos tus datos personales
              con terceros</strong>{" "}
              con fines comerciales o publicitarios. Tus datos solo ser&aacute;n
              comunicados a terceros cuando exista una obligaci&oacute;n legal.
            </p>
          </Section>

          {/* 6. Derechos del usuario */}
          <Section index={6} title="6. Tus derechos">
            <p>
              Como usuario, tienes derecho a ejercer en cualquier momento los
              siguientes derechos sobre tus datos personales:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7A7A85] ml-2">
              <li>
                <strong className="text-[#F0F0F5]">Acceso:</strong> conocer
                qu&eacute; datos personales tuyos estamos tratando.
              </li>
              <li>
                <strong className="text-[#F0F0F5]">Rectificaci&oacute;n:</strong>{" "}
                solicitar la correcci&oacute;n de datos inexactos o incompletos.
              </li>
              <li>
                <strong className="text-[#F0F0F5]">Supresi&oacute;n:</strong> pedir
                la eliminaci&oacute;n de tus datos cuando ya no sean necesarios.
              </li>
              <li>
                <strong className="text-[#F0F0F5]">Oposici&oacute;n:</strong>{" "}
                oponerte al tratamiento de tus datos en determinadas circunstancias.
              </li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, env&iacute;a un correo
              electr&oacute;nico a{" "}
              <a
                href="mailto:dentiaoficial@gmail.com"
                className="text-[#C9A84C] hover:underline"
              >
                dentiaoficial@gmail.com
              </a>{" "}
              indicando tu solicitud. Responderemos en un plazo m&aacute;ximo de 30
              d&iacute;as.
            </p>
          </Section>

          {/* 7. Cookies */}
          <Section index={7} title="7. Cookies">
            <p>
              Este sitio web <strong>no utiliza cookies de rastreo</strong> ni
              herramientas de seguimiento publicitario. &Uacute;nicamente se emplean
              las cookies t&eacute;cnicas estrictamente necesarias para el correcto
              funcionamiento del sitio.
            </p>
            <p>
              Estas cookies t&eacute;cnicas no recopilan informaci&oacute;n personal
              identificable y se eliminan autom&aacute;ticamente al cerrar el
              navegador o tras un breve periodo de tiempo.
            </p>
          </Section>

          {/* 8. Seguridad */}
          <Section index={8} title="8. Medidas de seguridad">
            <p>
              En AEVUM adoptamos las medidas t&eacute;cnicas y organizativas
              apropiadas para proteger tus datos personales frente al acceso no
              autorizado, la p&eacute;rdida, la alteraci&oacute;n o la
              destrucci&oacute;n accidental. Entre estas medidas se incluyen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7A7A85] ml-2">
              <li>Comunicaciones cifradas mediante protocolo HTTPS.</li>
              <li>
                Uso de servicios de terceros que cumplen con est&aacute;ndares de
                seguridad reconocidos.
              </li>
              <li>Acceso restringido a los datos personales almacenados.</li>
            </ul>
          </Section>

          {/* 9. Cambios en la política */}
          <Section index={9} title="9. Cambios en esta pol&iacute;tica">
            <p>
              Nos reservamos el derecho de actualizar esta Pol&iacute;tica de
              Privacidad en cualquier momento para reflejar cambios en nuestras
              pr&aacute;cticas o en la legislaci&oacute;n aplicable. Cualquier
              modificaci&oacute;n ser&aacute; publicada en esta misma p&aacute;gina
              con la fecha de &uacute;ltima actualizaci&oacute;n revisada.
            </p>
            <p>
              Te recomendamos revisar esta p&aacute;gina peri&oacute;dicamente para
              mantenerte informado sobre c&oacute;mo protegemos tus datos.
            </p>
          </Section>

          {/* 10. Contacto */}
          <Section index={10} title="10. Contacto">
            <p>
              Si tienes cualquier pregunta, duda o sugerencia sobre esta
              Pol&iacute;tica de Privacidad o sobre el tratamiento de tus datos
              personales, no dudes en escribirnos:
            </p>
            <div className="bg-[#0A0A0F] border border-[#1A1A25] rounded-lg p-6 mt-4">
              <p className="text-[#F0F0F5] font-medium">AEVUM</p>
              <p className="text-[#7A7A85] mt-1">
                Agencia de Integraci&oacute;n de Inteligencia Artificial
              </p>
              <a
                href="mailto:dentiaoficial@gmail.com"
                className="text-[#C9A84C] hover:underline mt-2 inline-block"
              >
                dentiaoficial@gmail.com
              </a>
            </div>
          </Section>
        </div>

        {/* Footer separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-[#1A1A25] text-center"
        >
          <p className="text-[#7A7A85] text-sm">
            &copy; {new Date().getFullYear()} AEVUM. Todos los derechos reservados.
          </p>
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
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      custom={index}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-[#F0F0F5] tracking-tight">
        {title}
      </h2>
      <div className="space-y-3 text-[#7A7A85] leading-relaxed text-[15px]">
        {children}
      </div>
    </motion.section>
  );
}
