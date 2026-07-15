import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prohit.app"),
  title: {
    default: "ProHit — Musculation, nutrition & bien-être",
    template: "%s · ProHit",
  },
  description:
    "ProHit est la plateforme tout-en-un pour la musculation, la nutrition et la remise en forme : programmes sur mesure, recettes healthy, tracker de calories et suivi de progression.",
  keywords: [
    "musculation",
    "nutrition",
    "fitness",
    "calories",
    "TDEE",
    "BMR",
    "programme de musculation",
    "recettes healthy",
  ],
  openGraph: {
    title: "ProHit — Musculation, nutrition & bien-être",
    description:
      "Programmes sur mesure, recettes healthy, tracker de calories et suivi de progression. La performance, naturellement.",
    url: "https://prohit.app",
    siteName: "ProHit",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("prohit-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
