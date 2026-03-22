"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { label: "WhatsApp", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative z-10 border-t border-[rgba(255,255,255,0.04)] py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex justify-between items-center flex-wrap gap-8">
          <span className="text-2xl font-extralight tracking-[0.2em] text-[#F0F0F5]">
            AEVUM
          </span>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#7A7A85] hover:text-[#F0F0F5] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.04)] flex justify-between items-center flex-wrap gap-4">
          <p className="text-xs text-[#7A7A85] opacity-50">
            &copy; {new Date().getFullYear()} AEVUM. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#7A7A85] opacity-30">
            Powered by Veqra
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
