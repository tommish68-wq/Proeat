"use client";

import { MessageSquareHeart, X } from "lucide-react";
import { useState } from "react";

const MAILTO =
  "mailto:proeat.nutrition@gmail.com" +
  "?subject=" +
  encodeURIComponent("Mon avis sur ProEat (bêta)") +
  "&body=" +
  encodeURIComponent(
    [
      "Salut Tom !",
      "",
      "Voici mon avis après avoir testé ProEat :",
      "",
      "Ce que j'aime :",
      "- ",
      "",
      "Ce qui m'a manqué ou gêné :",
      "- ",
      "",
      "Je l'utiliserais : oui / non / peut-être",
      "",
      "Testé sur : téléphone / ordinateur",
    ].join("\n")
  );

/* Bouton flottant « avis bêta » — retirable au vrai lancement */
export function BetaFeedback() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5">
      <a
        href={MAILTO}
        className="shadow-deep inline-flex items-center gap-2 rounded-full bg-leaf-deep py-3 pl-4 pr-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-leaf"
      >
        <MessageSquareHeart className="h-4 w-4" />
        Donner mon avis
      </a>
      <button
        onClick={() => setHidden(true)}
        aria-label="Masquer le bouton d'avis"
        className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-muted shadow-sm transition-colors hover:text-ink"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
