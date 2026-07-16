"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme-provider";

/* Navigation volontairement resserrée : le tableau de bord est le point
   d'entrée vers toutes les fonctionnalités. */
const links = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/recettes", label: "Recettes" },
  { href: "/tracker", label: "Tracker" },
  { href: "/premium", label: "Premium" },
  { href: "/profil", label: "Profil" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Sur les pages ouvrant sur un bandeau sombre, la navbar flotte
     au-dessus : on passe en texte clair pour rester lisible. */
  const darkTopPages = ["/", "/premium"];
  const onDark = darkTopPages.includes(pathname) && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-line shadow-[0_4px_24px_rgb(20_32_26_/_0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="ProEat — Accueil">
          <Logo onDark={onDark} />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-leaf-deep"
                    : onDark
                      ? "text-white/70 hover:text-white"
                      : "text-muted hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-leaf-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={
              theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"
            }
            className={`grid h-10 w-10 place-items-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
              onDark
                ? "border-white/20 bg-white/10 text-white/80 hover:text-white"
                : "border-line bg-surface text-muted hover:text-ink hover:border-leaf/40"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>
          <Link
            href="/dashboard"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0 sm:inline-flex ${
              onDark
                ? "bg-white text-[#0a2e22] hover:bg-sand"
                : "bg-leaf-deep text-white hover:bg-leaf dark:bg-leaf dark:text-[#08130d] dark:hover:bg-leaf-mid"
            }`}
          >
            Commencer
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className={`grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
              onDark
                ? "border-white/20 bg-white/10 text-white"
                : "border-line bg-surface text-ink"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-line bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      pathname.startsWith(link.href)
                        ? "bg-leaf-soft text-leaf-deep"
                        : "text-muted hover:bg-sand hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-xl bg-leaf-deep px-4 py-3 text-center text-base font-semibold text-white dark:bg-leaf dark:text-[#08130d]"
              >
                Commencer
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
