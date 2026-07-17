# Déployer ProEat sur Vercel 🚀

Le site est 100 % statique (aucune base de données, aucune variable
d'environnement) : le déploiement prend ~10 minutes.

## 1. Mettre le code sur la branche principale

Fusionnez la pull request en cours (`claude/prohit-fitness-platform-287lmm`)
dans `main` depuis GitHub — bouton **Merge pull request**.

## 2. Connecter Vercel

1. Créez un compte sur [vercel.com](https://vercel.com) avec **Continue with GitHub**.
2. **Add New → Project** → importez le dépôt `tommish68-wq/Proeat`.
3. Vercel détecte Next.js automatiquement — ne changez rien, cliquez **Deploy**.
4. Deux minutes plus tard : votre site est en ligne sur `proeat-xxx.vercel.app`.

Chaque `git push` sur `main` redéploiera automatiquement le site.

## 3. Brancher votre domaine

1. Achetez le domaine (par ex. `proeat.fr` ou `proeat.app`) chez OVH,
   Namecheap ou directement chez Vercel (~10–15 €/an).
2. Dans Vercel : **Settings → Domains → Add** → entrez le domaine.
3. Suivez les instructions DNS affichées (2 enregistrements à copier chez
   votre registrar). Le HTTPS est automatique.
4. Si le domaine final diffère de `proeat.app`, mettez à jour la constante
   `base` dans `src/app/sitemap.ts`, l'URL dans `src/app/robots.ts` et
   `metadataBase` dans `src/app/layout.tsx`.

## 4. Vérifications après mise en ligne

- [ ] Les photos Unsplash des recettes se chargent (elles étaient bloquées
      dans l'environnement de développement, pas en production).
- [ ] Parcours complet : calculateur → programme → recette → ajout au journal.
- [ ] Test sur téléphone.
- [ ] Soumettre `https://votre-domaine/sitemap.xml` dans
      [Google Search Console](https://search.google.com/search-console) pour
      accélérer le référencement.

## Prochaines étapes (quand vous serez prêt)

- **Paiements** : brancher Stripe pour activer les achats d'e-books et
  l'abonnement Premium (les pages et modales sont déjà prêtes).
- **Pages légales** : mentions légales et politique de confidentialité
  (obligatoires dès que le site collecte des e-mails ou encaisse).
- **Statistiques de visite** : Vercel Analytics (1 clic dans le dashboard
  Vercel, sans cookie).
