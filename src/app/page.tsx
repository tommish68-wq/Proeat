import type { Metadata } from "next";
import { HomeContent } from "@/components/home/home-content";

export const metadata: Metadata = {
  title: "ProHit — Musculation, nutrition & bien-être",
  description:
    "La plateforme tout-en-un pour transformer votre physique : programmes de musculation sur mesure, recettes healthy, calculateur de métabolisme et tracker de calories.",
};

export default function HomePage() {
  return <HomeContent />;
}
