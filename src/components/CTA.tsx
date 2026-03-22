"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const easing = [0.16, 1, 0.3, 1] as const;

// ─── EmailJS Config ───────────────────────────────────────
// Reemplaza estos valores con los de tu cuenta en emailjs.com
const EMAILJS_SERVICE_ID = "service_ctkhk9x";
const EMAILJS_TEMPLATE_ID = "template_mw49h66";
const EMAILJS_PUBLIC_KEY = "wagMNLiGaqaEW6yAG";
// ──────────────────────────────────────────────────────────

const inputClasses =
  "w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl px-5 py-4 text-[#F0F0F5] text-[15px] placeholder:text-[#7A7A85] placeholder:opacity-50 focus:outline-none focus:border-[rgba(201,168,76,0.3)] transition-colors";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function CTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const buttonText = {
    idle: "Enviar mensaje",
    sending: "Enviando...",
    success: "¡Mensaje enviado!",
    error: "Error — Inténtalo de nuevo",
  };

  const buttonStyles = {
    idle: "bg-[#F0F0F5] text-[#050507] hover:bg-white hover:shadow-[0_0_30px_rgba(201,168,76,0.15)]",
    sending: "bg-[#7A7A85] text-[#050507] cursor-wait",
    success: "bg-[#C9A84C] text-[#050507]",
    error: "bg-red-500/80 text-white",
  };

  return (
    <section id="contacto" className="relative z-10 bg-[#0A0A0D] py-32 px-6">
      {/* Title area */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.2, ease: easing }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.2em] text-[#C9A84C] mb-4"
        >
          Da el primer paso
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-extralight tracking-[0.04em] text-[#F0F0F5]"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Hablemos
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-[1px] bg-[#C9A84C] opacity-30 mx-auto mt-4 mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[#7A7A85] mb-16"
        >
          Cuéntanos qué necesitas y te respondemos en menos de 24 horas.
        </motion.p>
      </div>

      {/* Form */}
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: easing, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-[560px] mx-auto"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="company"
            required
            placeholder="Tu empresa"
            className={inputClasses}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Tu email"
            className={inputClasses}
          />
          <textarea
            name="challenge"
            required
            placeholder="¿Cuál es tu mayor cuello de botella?"
            rows={4}
            className={inputClasses}
          />
        </div>

        {/* Success message */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)] text-center"
          >
            <p className="text-[#C9A84C] text-sm">
              ✓ Tu mensaje fue enviado correctamente a AEVUM.
            </p>
            <p className="text-[#7A7A85] text-xs mt-1">
              Te responderemos en menos de 24 horas.
            </p>
          </motion.div>
        )}

        {/* Error message */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-center"
          >
            <p className="text-red-400 text-sm">
              No se pudo enviar el mensaje. Verifica tu conexión e inténtalo de nuevo.
            </p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full py-4 rounded-xl font-medium text-sm uppercase tracking-[0.1em] transition-all mt-4 ${buttonStyles[status]}`}
        >
          {buttonText[status]}
        </button>

        <p className="text-xs text-[#7A7A85] opacity-50 mt-6 text-center">
          Sin compromiso · Respondemos en &lt;24h · Tu información es
          confidencial
        </p>
      </motion.form>
    </section>
  );
}
