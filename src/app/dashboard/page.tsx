import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description:
    "Votre tableau de bord ProEat : calories du jour, entraînement, progression, poids, dernières recettes et programmes — tout en un coup d'œil.",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
