/* Préfixe les assets locaux avec le basePath du déploiement
   (vide en local et sur Vercel, « /Proeat » sur GitHub Pages). */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
