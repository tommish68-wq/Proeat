"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Leaf } from "lucide-react";

/**
 * next/image avec repli gracieux : si la photo distante ne charge pas,
 * on affiche un dégradé de marque plutôt qu'une image cassée.
 */
export function SmartImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center bg-gradient-to-br from-leaf-soft via-sand to-sand-deep"
      >
        <Leaf className="h-10 w-10 text-leaf/40" />
      </div>
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text -- alt vient des props
  return <Image {...props} onError={() => setFailed(true)} />;
}
