import type { Metadata } from "next";
import { Anton, Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BetaFeedback } from "@/components/beta-feedback";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proeat.app"),
  title: {
    default: "ProEat — Nutrition, musculation & bien-être",
    template: "%s · ProEat",
  },
  description:
    "ProEat est la plateforme tout-en-un pour la nutrition, la musculation et la remise en forme : calculateur de métabolisme, programmes sur mesure, recettes healthy et tracker de calories.",
  keywords: [
    "nutrition",
    "musculation",
    "fitness",
    "calories",
    "TDEE",
    "BMR",
    "programme de musculation",
    "recettes healthy",
  ],
  openGraph: {
    title: "ProEat — Nutrition, musculation & bien-être",
    description:
      "Calculateur de métabolisme, programmes sur mesure, recettes healthy, séances guidées et tracker de calories. 100 % gratuit.",
    url: "https://proeat.app",
    siteName: "ProEat",
    locale: "fr_FR",
    type: "website",
    images: [{ url: asset("/og.png"), width: 1200, height: 630, alt: "ProEat — Mangez juste. Entraînez-vous mieux. Progressez." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProEat — Nutrition, musculation & bien-être",
    description:
      "Calculateur, recettes détaillées, séances guidées : la plateforme 100 % gratuite.",
    images: [asset("/og.png")],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: asset("/icon.png"),
    apple: asset("/apple-icon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${archivo.variable} ${anton.variable} ${plexMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-leaf-deep focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu
        </a>
        <Navbar />
        <main id="contenu" className="flex-1">{children}</main>
        <Footer />
        <BetaFeedback />
      </body>
    </html>
  );
}
