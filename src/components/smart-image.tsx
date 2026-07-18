"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Leaf } from "lucide-react";

type SmartImageProps = ImageProps & {
  /** "dark" quand du texte clair est superposé à l'image (bannières promo). */
  fallbackTone?: "light" | "dark";
};

/**
 * next/image avec repli gracieux : si la photo distante ne charge pas,
 * on affiche un dégradé de marque plutôt qu'une image cassée.
 */
export function SmartImage({ fallbackTone = "light", ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center ${
          fallbackTone === "dark"
            ? "bg-gradient-to-br from-[#2f5d50] via-[#26493f] to-[#1d3a32]"
            : "bg-gradient-to-br from-leaf-soft via-sand to-sand-deep"
        }`}
      >
        <Leaf
          className={`h-10 w-10 ${
            fallbackTone === "dark" ? "text-[#8daa91]/50" : "text-leaf/40"
          }`}
        />
      </div>
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text -- alt vient des props
  return <Image {...props} onError={() => setFailed(true)} />;
}
