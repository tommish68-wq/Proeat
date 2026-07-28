"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  Check,
  Layers,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { packPrice, products, type Product } from "@/lib/products";
import { Button, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

/* ------------------------------------------------------------------ */
/* Couverture stylisée — façon édition ProEat                          */
/* ------------------------------------------------------------------ */

function BookCover({ product, small = false }: { product: Product; small?: boolean }) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-b from-[#30505c] via-[#2a454f] to-[#22383f] shadow-2xl ${
        small ? "h-40 w-28 p-3" : "h-56 w-40 p-4"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(10rem 6rem at 80% 0%, rgba(198,214,211,0.35), transparent 60%)",
        }}
      />
      <div className="relative">
        <span
          className={`inline-block rounded bg-white/10 px-1.5 py-0.5 font-tech uppercase tracking-wider text-white/80 ${
            small ? "text-[6px]" : "text-[8px]"
          }`}
        >
          Ebook · PDF
        </span>
        <p
          className={`mt-2 font-tech font-medium uppercase tracking-[0.2em] ${
            small ? "text-[7px]" : "text-[9px]"
          }`}
        >
          <span className="text-white">Pro</span>
          <span className="text-[#d9c5a5]">Eat</span>
        </p>
        <h3
          className={`mt-2 font-display font-semibold uppercase leading-tight text-white ${
            small ? "text-xs" : "text-lg"
          }`}
        >
          {product.title}
        </h3>
        <span
          aria-hidden
          className={`mt-2 block h-0.5 rounded-full bg-[#a37b4d] ${small ? "w-5" : "w-8"}`}
        />
        {!small && (
          <p className="mt-2 text-[10px] leading-snug text-white/70">
            {product.subtitle}
          </p>
        )}
      </div>
      <p
        className={`relative font-tech uppercase tracking-[0.18em] text-white/50 ${
          small ? "text-[6px]" : "text-[8px]"
        }`}
      >
        Guide ProEat
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carte produit                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({
  product,
  onBuy,
  onPreview,
}: {
  product: Product;
  onBuy: () => void;
  onPreview: () => void;
}) {
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div className="relative flex items-center justify-center bg-sand/60 py-8">
        <BookCover product={product} />
        {product.bestseller && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-[#241a10]">
            <Sparkles className="h-3 w-3" />
            Le plus choisi
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2 font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
          <span>Ebook · PDF</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {product.pages} pages
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
          {product.title}
        </h3>
        <p className="text-sm font-medium text-leaf">{product.subtitle}</p>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-5 border-t border-line pt-5">
          <p className="font-display text-2xl font-bold text-ink">
            {product.price.toFixed(2).replace(".", ",")} €
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <Button onClick={onBuy} className="w-full py-3">
              <ShoppingBag className="h-4 w-4" />
              Obtenir le guide
            </Button>
            <Button variant="secondary" onClick={onPreview} className="w-full py-3">
              <BookOpen className="h-4 w-4" />
              Voir le contenu
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Modal « contenu du guide » — le sommaire complet, chapitre par      */
/* chapitre, pour acheter en connaissance de cause                     */
/* ------------------------------------------------------------------ */

function PreviewModal({
  product,
  onClose,
  onBuy,
}: {
  product: Product;
  onClose: () => void;
  onBuy: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Contenu du guide : ${product.title}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-card shadow-2xl"
      >
        <div className="relative flex items-center gap-5 bg-[#2a454f] p-6 sm:p-8">
          <div className="hidden shrink-0 sm:block">
            <BookCover product={product} small />
          </div>
          <div className="min-w-0">
            <p className="font-tech text-[11px] uppercase tracking-[0.16em] text-[#d9c5a5]">
              Ce que contient le guide
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-semibold text-white">
              {product.title}
            </h2>
            <p className="mt-1 text-sm text-white/70">
              {product.subtitle} · {product.pages} pages ·{" "}
              {product.chapters.length} chapitres
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {product.chapters.map((c, i) => (
            <section key={c.title}>
              <h3 className="flex items-baseline gap-3">
                <span className="font-display text-lg font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-semibold text-ink">
                  {c.title}
                </span>
              </h3>
              <ul className="mt-2.5 space-y-2 border-l-2 border-leaf-soft pl-5">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="sticky bottom-0 -mx-6 border-t border-line bg-card/95 px-6 py-4 backdrop-blur sm:-mx-8 sm:px-8">
            <Button onClick={onBuy} className="w-full py-3.5">
              <ShoppingBag className="h-4 w-4" />
              Obtenir le guide · {product.price.toFixed(2).replace(".", ",")} €
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Page boutique                                                       */
/* ------------------------------------------------------------------ */

export function ShopContent() {
  const [preview, setPreview] = useState<Product | null>(null);
  const [purchased, setPurchased] = useState<{ title: string; price: number } | null>(
    null
  );

  const totalSolo = products.reduce((s, p) => s + p.price, 0);

  return (
    <div>
      <div className="hero-glow">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Boutique"
              title="Les guides ProEat pour aller plus vite"
              description="Trois guides écrits comme un coach vous parle : des étapes claires, des chiffres précis, zéro blabla. Consultez le sommaire complet de chaque guide avant de vous décider."
            />
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <ProductCard
                product={p}
                onBuy={() => setPurchased({ title: p.title, price: p.price })}
                onPreview={() => setPreview(p)}
              />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Pack complet */}
        <Reveal>
          <div className="noise relative mt-10 overflow-hidden rounded-[2rem] bg-[#22383f] px-7 py-12 sm:px-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(36rem 20rem at 85% -10%, rgba(94,124,116,0.35), transparent 62%), radial-gradient(24rem 16rem at 5% 110%, rgba(163,123,77,0.25), transparent 62%)",
              }}
            />
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.16em] text-[#d9c5a5]">
                  <Layers className="h-3.5 w-3.5" />
                  Le pack complet
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  Les 3 guides réunis
                </h2>
                <p className="mt-3 text-base text-white/70">
                  Sèche, prise de masse et meal prep : toute la méthode ProEat
                  dans un seul pack, pour couvrir chaque phase de votre
                  progression.
                </p>
                <p className="mt-5">
                  <span className="font-display text-4xl font-bold text-white">
                    {packPrice.toFixed(2).replace(".", ",")} €
                  </span>
                  <span className="ml-3 text-base text-white/50 line-through">
                    {totalSolo.toFixed(2).replace(".", ",")} €
                  </span>
                </p>
                <button
                  onClick={() =>
                    setPurchased({ title: "Le pack complet — 3 guides", price: packPrice })
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#22383f] shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Je prends le pack
                </button>
              </div>
              <div className="hidden items-end gap-3 lg:flex" aria-hidden>
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className={i === 1 ? "-translate-y-4" : ""}
                  >
                    <BookCover product={p} small />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Réassurance */}
        <Reveal>
          <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-surface p-8 sm:grid-cols-3">
            {[
              ["Sommaire transparent", "Chaque chapitre est consultable avant l'achat."],
              ["PDF haute qualité", "Lisible sur téléphone, tablette et ordinateur."],
              ["Mises à jour incluses", "Chaque nouvelle édition vous est offerte."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-xs text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Sommaire complet */}
      <AnimatePresence>
        {preview && (
          <PreviewModal
            key={preview.id}
            product={preview}
            onClose={() => setPreview(null)}
            onBuy={() => {
              setPurchased({ title: preview.title, price: preview.price });
              setPreview(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Confirmation d'achat (paiement à venir) */}
      <AnimatePresence>
        {purchased && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setPurchased(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="card relative w-full max-w-md p-8 text-center"
            >
              <button
                onClick={() => setPurchased(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-sand"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-soft">
                <ShoppingBag className="h-7 w-7 text-leaf" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                Bientôt disponible
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Le paiement en ligne arrive très prochainement. «{" "}
                <span className="font-medium text-ink">{purchased.title}</span> » sera
                alors disponible en téléchargement immédiat pour{" "}
                <span className="font-semibold text-ink">
                  {purchased.price.toFixed(2).replace(".", ",")} €
                </span>
                .
              </p>
              <Button onClick={() => setPurchased(null)} className="mt-6 w-full">
                Compris
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
