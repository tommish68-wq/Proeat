import type { Metadata } from "next";
import { TrackerContent } from "@/components/tracker/tracker-content";

export const metadata: Metadata = {
  title: "Tracker de calories & macros",
  description:
    "Suivez vos calories, protéines, glucides, lipides et votre poids jour après jour avec des graphiques d'évolution clairs et un tableau de bord moderne.",
};

export default function TrackerPage() {
  return <TrackerContent />;
}
