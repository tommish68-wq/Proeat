import type { NextConfig } from "next";

/* Déploiement GitHub Pages : export statique servi sous /Proeat.
   En local et sur Vercel, rien ne change. */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export",
    basePath: "/Proeat",
    trailingSlash: true,
  }),
  images: isGithubPages
    ? { unoptimized: true }
    : {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com",
          },
        ],
      },
};

export default nextConfig;
