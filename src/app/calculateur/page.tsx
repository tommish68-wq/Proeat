import type { Metadata } from "next";
import { CalculatorContent } from "@/components/calculator/calculator-content";

export const metadata: Metadata = {
  title: "Calculateur de métabolisme (BMR & TDEE)",
  description:
    "Calculez gratuitement votre métabolisme de base (BMR) et votre dépense énergétique totale (TDEE) : calories de maintien, sèche et prise de masse avec répartition des macros.",
};

export default function CalculatorPage() {
  return <CalculatorContent />;
}
