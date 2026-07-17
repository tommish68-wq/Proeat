import type { Metadata } from "next";
import { ShopContent } from "@/components/shop/shop-content";

export const metadata: Metadata = {
  title: "Boutique — E-books & guides",
  description:
    "E-books nutrition et musculation, guides de sèche et de prise de masse, recettes premium : les guides ProEat pour accélérer votre transformation.",
};

export default function ShopPage() {
  return <ShopContent />;
}
