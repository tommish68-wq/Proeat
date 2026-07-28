import Image from "next/image";
import { asset } from "@/lib/asset";

/* Logo officiel ProEat — wordmark bleu pétrole, feuille sur le « o ».
   Fichier transparent : public/images/logo-proeat.png (icône : /icon.png). */
export function Logo({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  if (compact) {
    return (
      <Image
        src={asset("/icon.png")}
        alt="ProEat"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    );
  }
  /* Sur bandeau sombre : pastille blanche, le logo garde sa couleur exacte */
  return (
    <span
      className={`inline-flex items-center transition-colors duration-300 ${
        onDark ? "rounded-full bg-white px-3.5 py-1.5" : ""
      }`}
    >
      <Image
        src={asset("/images/logo-proeat.png")}
        alt="ProEat"
        width={327}
        height={96}
        priority
        className={onDark ? "h-6 w-auto" : "h-8 w-auto"}
      />
    </span>
  );
}
