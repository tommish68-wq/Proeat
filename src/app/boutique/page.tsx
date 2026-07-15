import type { Metadata } from "next";
import { ShopContent } from "@/components/shop/shop-content";

export const metadata: Metadata = {
  title: "Boutique — E-books & guides premium",
  description:
    "E-books nutrition et musculation, guides de sèche et de prise de masse, recettes premium : les meilleurs guides pour accélérer votre transformation.",
};

export default function ShopPage() {
  return <ShopContent />;
}
