import type { Metadata } from "next";
import { SeanceContent } from "@/components/seance/seance-content";

export const metadata: Metadata = {
  title: "Séance guidée",
  description:
    "Lancez votre séance de musculation : compteur de séries, chrono de repos automatique et objectifs ajustés séance après séance.",
};

export default function SeancePage() {
  return <SeanceContent />;
}
