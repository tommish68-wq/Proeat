"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  Check,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import {
  productCategoryLabels,
  products,
  type Product,
  type ProductCategory,
} from "@/lib/products";
import { Badge, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";

const categories = Object.entries(productCategoryLabels) as [ProductCategory, string][];

function ProductCard({ product, onBuy }: { product: Product; onBuy: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="card card-hover flex h-full flex-col overflow-hidden"
    >
      {/* Couverture stylisée de l'e-book */}
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-leaf-dark via-leaf-deep to-leaf dark:from-leaf-soft dark:via-sand-deep dark:to-sand">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(18rem 10rem at 85% 10%, rgba(255,255,255,0.35), transparent 60%)",
          }}
        />
        <div className="relative flex h-28 w-20 flex-col items-center justify-between rounded-lg border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 dark:border-black/10 dark:bg-black/10">
          <span className="text-2xl">{product.emoji}</span>
          <span className="text-center text-[8px] font-semibold uppercase leading-tight tracking-wider text-white dark:text-ink">
            ProHit
          </span>
        </div>
        {product.bestseller && (
          <span className="absolute left-3 top-3">
            <Badge tone="gold" className="bg-gold/90 text-white dark:text-[#1a140a]">
              <Sparkles className="h-3 w-3" />
              Best-seller
            </Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="outline">{productCategoryLabels[product.category]}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted">
            <BookOpen className="h-3.5 w-3.5" />
            {product.pages} pages
          </span>
        </div>
        <h3 className="mt-3 font-semibold leading-snug text-ink">{product.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <ul className="mt-4 space-y-1.5">
          {product.preview.map((p) => (
            <li key={p} className="flex items-start gap-2 text-xs text-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
          <p>
            <span className="text-2xl font-bold text-ink">{product.price} €</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted line-through">
                {product.originalPrice} €
              </span>
            )}
          </p>
          <Button onClick={onBuy} className="px-5 py-2.5">
            <ShoppingBag className="h-4 w-4" />
            Acheter
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function ShopContent() {
  const [category, setCategory] = useState<ProductCategory | "tous">("tous");
  const [purchased, setPurchased] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      category === "tous"
        ? products
        : products.filter((p) => p.category === category),
    [category]
  );

  return (
    <div>
      <div className="hero-glow">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Boutique"
              title="Des guides d'experts pour aller plus vite"
              description="E-books rédigés par des coachs diplômés : nutrition, musculation, sèche, prise de masse et recettes premium. Téléchargement immédiat, mises à jour incluses."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <button
                data-active={category === "tous"}
                onClick={() => setCategory("tous")}
                className="chip"
              >
                Tous
              </button>
              {categories.map(([id, label]) => (
                <button
                  key={id}
                  data-active={category === id}
                  onClick={() => setCategory(id)}
                  className="chip"
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onBuy={() => setPurchased(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Réassurance */}
        <Reveal>
          <div className="mt-16 grid gap-4 rounded-2xl border border-line bg-surface p-8 sm:grid-cols-3">
            {[
              ["Téléchargement immédiat", "PDF haute qualité, lisible sur tous vos appareils."],
              ["Satisfait ou remboursé", "14 jours pour changer d'avis, sans condition."],
              ["Mises à jour à vie", "Chaque nouvelle édition vous est offerte."],
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

      {/* Confirmation d'achat (démo) */}
      <AnimatePresence>
        {purchased && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setPurchased(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-md p-8 text-center"
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
                <span className="font-semibold text-ink">{purchased.price} €</span>.
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
