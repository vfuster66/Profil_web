# Profil web

Site personnel de Virginie Fuster Perez, développeuse QA.
Adresse publiée : https://vfuster66.github.io/Profil_web/

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

Les captures et visuels des projets sont dans `src/assets/projets/`.

Le CV téléchargeable est `public/CV_Virginie_Fuster_Perez.pdf` : remplacez ce fichier pour le mettre à jour.

## Déploiement

Chaque push sur `main` construit et publie le site.
Une seule fois : dans le dépôt, **Settings > Pages > Build and deployment > Source**, choisir **GitHub Actions**.
