import type { Metadata } from "next";
import { ProfileContent } from "@/components/profile/profile-content";

export const metadata: Metadata = {
  title: "Profil — Espace membre",
  description:
    "Votre espace membre ProHit : objectifs, progression, historique de poids, badges et statistiques personnelles.",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
