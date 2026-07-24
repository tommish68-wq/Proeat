import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://proeat.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    { url: `${base}/calculateur`, priority: 0.9 },
    { url: `${base}/programme`, priority: 0.9 },
    { url: `${base}/seance`, priority: 0.8 },
    { url: `${base}/recettes`, priority: 0.9 },
    { url: `${base}/tracker`, priority: 0.8 },
    { url: `${base}/premium`, priority: 0.8 },
    { url: `${base}/methode`, priority: 0.7 },
    { url: `${base}/boutique`, priority: 0.8 },
    { url: `${base}/dashboard`, priority: 0.7 },
    { url: `${base}/profil`, priority: 0.6 },
  ].map((e) => ({ ...e, changeFrequency: "weekly" as const }));
}
