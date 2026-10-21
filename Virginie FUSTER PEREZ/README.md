# vfuster66.github.io

Site personnel de Virginie Fuster Perez, développeuse QA.

Vue 3, TypeScript et Vite, déployé sur GitHub Pages par GitHub Actions.

## Développer en local

```bash
npm install
npm run dev
```

## Mettre à jour le contenu

Tout le texte du site (parcours, projets, compétences, formation, contacts) est dans `src/data/profil.ts`.
Le tableau des départs du haut de page se règle dans la liste `departs` du même fichier.

## Le CV

Déposez le CV à jour dans `public/` sous le nom `CV_Virginie_Fuster_Perez.pdf`.

## Déploiement

Chaque push sur `main` construit et publie le site.
Une seule fois : dans le dépôt, **Settings > Pages > Build and deployment > Source**, choisir **GitHub Actions**.
