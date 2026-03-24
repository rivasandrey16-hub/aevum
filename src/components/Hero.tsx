"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const easing = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: easing },
  },
};

const letterReveal = (i: number) => ({
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.5 + i * 0.08, ease: easing },
  },
});

const lineGrow = {
  hidden: { width: 0, opacity: 0 },
  show: {
    width: 50,
    opacity: 0.3,
    transition: { duration: 1.2, delay: 1.2, ease: easing },
  },
};

const bounceTransition = {
  y: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  },
};

const TITLE = "AEVUM";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-8 px-4 text-center"
      >
        {/* Badge */}
        <motion.span
          variants={fadeUp}
          className="rounded-full border border-[rgba(201,168,76,0.3)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#C9A84C] opacity-80"
        >
          AI Integration Agency
        </motion.span>

        {/* Title */}
        <div className="flex flex-col items-center gap-4">
          <h1
            className="flex font-[100] text-[#F0F0F5] tracking-[0.3em]"
            style={{ fontSize: "clamp(60px, 12vw, 120px)" }}
          >
            {TITLE.split("").map((letter, i) => (
              <motion.span
                key={i}
                variants={letterReveal(i)}
                initial="hidden"
                animate="show"
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          {/* Gold decorative line */}
          <motion.div
            variants={lineGrow}
            initial="hidden"
            animate="show"
            className="h-px bg-[#C9A84C]"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-xl text-base leading-relaxed text-[#7A7A85] md:text-lg"
        >
          Diseñamos sistemas inteligentes que trabajan dentro
          <br />
          de tu negocio — invisibles, precisos, incansables
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-sm tracking-wider text-[#C9A84C] opacity-60"
        >
          Donde la estrategia se encuentra con la inteligencia artificial
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contacto"
            className="rounded-full bg-[#F0F0F5] px-8 py-3.5 text-sm font-medium text-[#050507] transition-colors hover:bg-white"
          >
            Empezar ahora
          </Link>
          <Link
            href="#servicios"
            className="rounded-full border border-[rgba(240,240,245,0.15)] px-8 py-3.5 text-sm text-[#F0F0F5] transition-colors hover:border-[rgba(240,240,245,0.3)]"
          >
            Ver servicios
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40"
        >
          <motion.svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ y: [0, 8, 0] }}
            transition={bounceTransition}
          >
            <path
              d="M10 2L10 22M10 22L18 14M10 22L2 14"
              stroke="#F0F0F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
