import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
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
      "Calculateur de métabolisme, programmes sur mesure, recettes healthy et tracker de calories. La performance, naturellement.",
    url: "https://proeat.app",
    siteName: "ProEat",
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
            __html: `try{if(localStorage.getItem("proeat-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${instrument.variable} ${bricolage.variable} ${anton.variable} ${plexMono.variable} min-h-screen flex flex-col antialiased`}
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
