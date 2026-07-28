import type { Metadata } from "next";
import { MethodeContent } from "@/components/methode/methode-content";

export const metadata: Metadata = {
  title: "La méthode — Comment ça marche",
  description:
    "La méthode ProEat en trois étapes : calculez vos besoins, recevez votre plan, suivez votre progression. Nos engagements et les réponses à vos questions.",
};

export default function MethodePage() {
  return <MethodeContent />;
}
