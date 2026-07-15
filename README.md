# ProHit 🌿

**ProHit** est une plateforme tout-en-un dédiée à la musculation, à la nutrition et à la remise en forme — une expérience premium à l'ambiance tropicale : nature, bien-être et performance.

## Pages

| Page | Route | Description |
|---|---|---|
| Accueil | `/` | Landing premium : hero, statistiques, fonctionnalités, témoignages, FAQ, CTA |
| Calculateur | `/calculateur` | BMR & TDEE (Mifflin-St Jeor) + calories sèche / maintien / masse + macros |
| Programme | `/programme` | Générateur de programme selon niveau, objectif, matériel, fréquence et durée |
| Recettes | `/recettes` | Galerie filtrable avec macros, ingrédients et préparation détaillés |
| Tracker | `/tracker` | Journal calories & macros, suivi du poids, graphiques d'évolution |
| Boutique | `/boutique` | E-books nutrition/musculation, guides sèche & prise de masse |
| Profil | `/profil` | Espace membre : objectifs, progression, historique, badges, statistiques |
| Dashboard | `/dashboard` | Vue d'ensemble : calories du jour, séance, poids, recettes, accès rapides |

## Stack technique

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design system via variables CSS (`globals.css`)
- **Framer Motion** — animations, transitions, micro-interactions
- **Lucide Icons**
- Mode sombre (classe `.dark`, persisté en localStorage, sans flash au chargement)
- Données utilisateur (repas, poids, profil) stockées **localement dans le navigateur**
- SEO : metadata par page, Open Graph, `sitemap.xml`, `robots.txt`

## Démarrer

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de production
npm run lint
```

## Structure

```
src/
├── app/                  # Routes (App Router) — 1 page.tsx (SEO) par route
├── components/
│   ├── ui.tsx            # Boutons, badges, champs, progress, skeleton
│   ├── motion.tsx        # Reveal, Stagger, Counter (Framer Motion)
│   ├── charts.tsx        # LineChart, BarChart, MacroRing (SVG maison)
│   ├── navbar.tsx / footer.tsx / logo.tsx / theme-provider.tsx
│   └── <page>/           # Contenu client de chaque page
└── lib/
    ├── metabolism.ts     # Calculs BMR / TDEE / macros
    ├── program.ts        # Générateur de programmes (catalogue d'exercices)
    ├── recipes.ts        # Bibliothèque de recettes
    ├── products.ts       # Catalogue boutique
    └── store.ts          # Persistance localStorage (profil, repas, poids)
```
