import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ChefHat, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Boutique — Bientôt disponible",
  description:
    "La boutique ProEat arrive bientôt : e-books nutrition et musculation, guides de sèche et de prise de masse, recettes premium.",
};

const upcoming = [
  { icon: BookOpen, label: "E-books nutrition & musculation" },
  { icon: Dumbbell, label: "Guides de sèche et de prise de masse" },
  { icon: ChefHat, label: "Recettes premium" },
];

export default function ShopPage() {
  return (
    <div className="hero-glow">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <Badge tone="gold">Bientôt disponible</Badge>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          La boutique arrive
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          Nous préparons une sélection de guides d’experts pour accélérer
          votre transformation. En attendant, tous les outils ProEat restent
          100 % gratuits.
        </p>
        <ul className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {upcoming.map((u) => (
            <li
              key={u.label}
              className="card flex flex-col items-center gap-3 rounded-2xl p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-soft text-leaf">
                <u.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-ink">{u.label}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/dashboard"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-leaf-deep px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-leaf dark:bg-leaf dark:text-[#08130d]"
        >
          Retour au tableau de bord
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
