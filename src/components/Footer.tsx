"use client";

import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61579409933682",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
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

          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-[#7A7A85] hover:text-[#C9A84C] transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Legal links */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href="/aevum/privacidad"
            className="text-xs text-[#7A7A85] opacity-50 hover:opacity-100 hover:text-[#C9A84C] transition-all duration-300"
          >
            Política de Privacidad
          </a>
          <span className="text-[#C9A84C] opacity-20 text-xs">·</span>
          <a
            href="/aevum/terminos"
            className="text-xs text-[#7A7A85] opacity-50 hover:opacity-100 hover:text-[#C9A84C] transition-all duration-300"
          >
            Términos y Condiciones
          </a>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.04)] flex justify-between items-center flex-wrap gap-4">
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
