import type { Metadata } from "next";
import { PremiumContent } from "@/components/premium/premium-content";

export const metadata: Metadata = {
  title: "Premium — Passez au niveau supérieur",
  description:
    "ProEat Premium : recettes illimitées, programmes avancés, plans de repas selon vos macros et statistiques détaillées. 5,99 €/mois ou 39,99 €/an, résiliable en un clic.",
};

export default function PremiumPage() {
  return <PremiumContent />;
}
