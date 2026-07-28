import type { Metadata } from "next";
import { ProgramContent } from "@/components/program/program-content";

export const metadata: Metadata = {
  title: "Générateur de programme de musculation",
  description:
    "Générez gratuitement un programme de musculation personnalisé selon votre niveau, votre objectif, votre matériel et votre nombre de séances par semaine.",
};

export default function ProgramPage() {
  return <ProgramContent />;
}
