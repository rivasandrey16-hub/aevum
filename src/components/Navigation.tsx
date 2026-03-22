"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Nosotros", href: "#nosotros" },
];

const CTA_LINK = { label: "Hablemos", href: "#contacto" };

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50"
        style={{
          backgroundColor: scrolled ? "rgba(5,5,7,0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="select-none"
            style={{
              fontWeight: 100,
              letterSpacing: "0.2em",
              color: "#F0F0F5",
              fontSize: "1.25rem",
            }}
          >
            AEVUM
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm uppercase tracking-[0.15em] text-[#7A7A85] hover:text-[#F0F0F5] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href={CTA_LINK.href}
              onClick={(e) => handleSmoothScroll(e, CTA_LINK.href)}
              className="border border-[rgba(201,168,76,0.3)] text-[#C9A84C] px-6 py-2 rounded-full text-sm hover:bg-[rgba(201,168,76,0.1)] transition-colors"
            >
              {CTA_LINK.label}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <motion.span
              className="absolute block w-6 h-[1.5px] bg-[#F0F0F5]"
              animate={
                mobileOpen
                  ? { rotate: 45, y: 0 }
                  : { rotate: 0, y: -6 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute block w-6 h-[1.5px] bg-[#F0F0F5]"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute block w-6 h-[1.5px] bg-[#F0F0F5]"
              animate={
                mobileOpen
                  ? { rotate: -45, y: 0 }
                  : { rotate: 0, y: 6 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[rgba(5,5,7,0.97)] md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="text-2xl uppercase tracking-[0.15em] text-[#7A7A85] hover:text-[#F0F0F5] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href={CTA_LINK.href}
                onClick={(e) => handleSmoothScroll(e, CTA_LINK.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 * NAV_LINKS.length, duration: 0.3 }}
                className="mt-4 border border-[rgba(201,168,76,0.3)] text-[#C9A84C] px-8 py-3 rounded-full text-lg hover:bg-[rgba(201,168,76,0.1)] transition-colors"
              >
                {CTA_LINK.label}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
