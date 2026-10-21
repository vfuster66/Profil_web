// Toutes les infos du site sont ici : modifiez ce fichier pour mettre le site à jour.

import captureArtizio from '../assets/projets/artizio.jpg'
import visuelTrajio from '../assets/projets/trajio.jpg'
import captureFuster from '../assets/projets/fuster-peinture.jpg'
import flyerFuster from '../assets/projets/fuster-peinture-flyer.jpg'

export const identite = {
  nom: 'Virginie Fuster Perez',
  titre: 'Développeuse QA, qualité logicielle et systèmes d’information',
  ville: 'Cabestany (66)',
  email: 'fuster.virginie@free.fr',
  telephone: '06 62 16 18 79',
  linkedin: 'https://www.linkedin.com/in/virginie-fuster-perez',
  github: 'https://github.com/vfuster66',
  cv: 'CV_Virginie_Fuster_Perez.pdf',
}

export const accroche = [
  'Je fais en sorte que les applications fonctionnent avant d’arriver chez leurs utilisateurs : tests automatisés, non-régression et suivi des anomalies, au plus près des équipes produit et développement.',
  'Formée à l’architecture informatique et aux données, je développe aussi des sites et applications avec mon entreprise, EVieDev. Mon cap : faire de la qualité une affaire de conception, pas seulement de vérification.',
]

export type Statut = 'EN VOL' | 'PARTI'

export interface Depart {
  annee: string
  poste: string
  lieu: string
  statut: Statut
  cible: string // id de la section détaillée à afficher au clic
}

// Tableau des départs du haut de page (le plus récent en premier).
export const departs: Depart[] = [
  { annee: '2026', poste: 'DÉVELOPPEUSE QA', lieu: 'UGOFRESH', statut: 'EN VOL', cible: 'exp-ugofresh' },
  { annee: '2026', poste: 'PRÉSIDENTE', lieu: 'EVIEDEV', statut: 'EN VOL', cible: 'exp-eviedev' },
  { annee: '2024', poste: 'ALTERNANCE QA', lieu: 'UGOFRESH', statut: 'PARTI', cible: 'exp-ugofresh' },
  { annee: '2024', poste: 'DÉV. MOBILE', lieu: 'CLEANSPOT', statut: 'PARTI', cible: 'exp-cleanspot' },
  { annee: '2022', poste: 'TRONC COMMUN', lieu: 'ÉCOLE 42', statut: 'PARTI', cible: 'formation' },
  { annee: '2021', poste: 'CHEF D’ESCALE ADJ.', lieu: 'AÉROPORT PGF', statut: 'PARTI', cible: 'exp-aeroport' },
  { annee: '2017', poste: 'SUPERVISEURE ESCALE', lieu: 'AÉROPORT PGF', statut: 'PARTI', cible: 'exp-aeroport' },
  { annee: '2005', poste: 'AGENTE DE TRAFIC', lieu: 'AÉROPORT PGF', statut: 'PARTI', cible: 'exp-aeroport' },
  { annee: '1998', poste: 'AGENTE D’ESCALE', lieu: 'AÉROPORT PGF', statut: 'PARTI', cible: 'exp-aeroport' },
]

export interface Experience {
  id: string
  poste: string
  structure: string
  periode: string
  points: string[]
  etapes?: { periode: string; poste: string }[]
}

export const experiences: Experience[] = [
  {
    id: 'exp-ugofresh',
    poste: 'Développeuse QA',
    structure: 'UgoFresh',
    periode: 'Depuis octobre 2026, en alternance d’octobre 2024 à septembre 2026',
    points: [
      'Conception et automatisation des tests de bout en bout avec Playwright et Cypress.',
      'Plans et cas de test, recettes fonctionnelles des parcours utilisateurs.',
      'Tests de non-régression et validation de chaque évolution avant mise en production.',
      'Qualification des anomalies et suivi de leur correction avec les équipes produit et développement.',
      'Support applicatif, documentation fonctionnelle et de tests.',
    ],
  },
  {
    id: 'exp-eviedev',
    poste: 'Présidente',
    structure: 'EVieDev',
    periode: 'Depuis 2026',
    points: [
      'Création et gestion d’une entreprise de développement web.',
      'Édition d’Artizio, suite d’outils mobiles pour les artisans du bâtiment.',
      'Sites clients sur mesure, de Vue et React au HTML/CSS, du recueil des besoins à la mise en ligne.',
    ],
  },
  {
    id: 'exp-cleanspot',
    poste: 'Développeuse full stack mobile',
    structure: 'Cleanspot',
    periode: 'Juin à septembre 2024',
    points: [
      'Application mobile de mise en relation entre propriétaires de logements et prestataires de ménage, de la maquette à la V1.',
      'Développement en autonomie du front-end et du back-end, participation aux choix d’architecture.',
    ],
  },
  {
    id: 'exp-aeroport',
    poste: 'Exploitation aéroportuaire',
    structure: 'Aéroport de Perpignan',
    periode: '1998 à 2022',
    points: [
      'Coordination des opérations d’escale et management des équipes au sol.',
      'Gestion des aléas et des situations d’urgence, en lien avec les compagnies aériennes et les services de l’État.',
      'Rédaction des procédures, veille réglementaire et formation des nouveaux agents.',
    ],
    etapes: [
      { periode: '2021 – 2022', poste: 'Chef d’escale adjointe' },
      { periode: '2017 – 2021', poste: 'Superviseure escale' },
      { periode: '2005 – 2017', poste: 'Agente de trafic' },
      { periode: '1998 – 2005', poste: 'Agente d’escale' },
    ],
  },
]

export interface Projet {
  nom: string
  description: string
  stack?: string[]
  lien?: string
  // Capture d’écran du site (dans src/assets/projets/, importée en haut du fichier)
  image?: string
  // Visuels complémentaires (affiches, réseaux sociaux…), ouverts en grand au clic
  visuels?: { src: string; alt: string; legende: string }[]
  // Aperçu affiché tant qu’il n’y a pas de capture
  apercu: { titre: string; sousTitre: string; fond: string; texte: string }
  // Détails techniques affichés en dépliant la carte
  details: string[]
}

export const projets: Projet[] = [
  {
    nom: 'Artizio',
    description:
      'Suite d’outils mobiles pour les artisans du bâtiment, éditée par EVieDev : kilomètres (Trajio), métrés (Surfacio), photos de chantier (Staggio) et notes de frais (Frezio). Trajio et Surfacio sont prêts pour les stores.',
    stack: ['Flutter', 'Dart'],
    lien: 'https://artizio.fr/',
    image: captureArtizio,
    visuels: [{ src: visuelTrajio, alt: 'Affiche de lancement de Trajio, application de suivi des kilomètres', legende: 'Affiche de lancement de Trajio' }],
    apercu: { titre: 'Moins de gestion. Plus de chantiers.', sousTitre: 'Outils mobiles pour artisans du bâtiment', fond: '#88153a', texte: '#ffffff' },
    details: [
      'Quatre applications indépendantes : Trajio, Surfacio, Staggio et Frezio.',
      'Pensées mobile d’abord, utilisables d’une main sur le chantier.',
      'Données stockées sur l’appareil, sans compte obligatoire.',
      'Exports CSV et Excel, dossiers PDF dans la version Pro.',
      'Couche commune d’observabilité : erreurs, crashs et diagnostic, couverte par des tests.',
    ],
  },
  {
    nom: 'Fuster Peinture',
    description:
      'Site d’un artisan peintre à Cabestany : présentation des services, réalisations avant et après, demande de devis et gestion des cookies conforme au RGPD.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    lien: 'https://www.fuster-peinture.fr/',
    image: captureFuster,
    visuels: [{ src: flyerFuster, alt: 'Flyer Fuster Peinture : besoin d’un peintre ?', legende: 'Flyer pour les réseaux sociaux' }],
    apercu: { titre: 'Artisan peintre à Cabestany', sousTitre: 'Peinture intérieure et extérieure', fond: '#f1ece4', texte: '#1f2a37' },
    details: [
      'Site vitrine responsive, sans framework, optimisé pour le référencement local.',
      'Galerie de chantiers avant, pendant et après.',
      'Formulaire de devis avec validation des champs côté client.',
      'Bandeau de consentement aux cookies conforme au RGPD, mesure d’audience optionnelle.',
    ],
  },
]

export const competences: { groupe: string; items: string[] }[] = [
  {
    groupe: 'Qualité et tests',
    items: ['Playwright', 'Cypress', 'Tests E2E', 'Tests de non-régression', 'Plans et cas de test', 'Recette fonctionnelle', 'Suivi des anomalies'],
  },
  {
    groupe: 'Développement',
    items: ['TypeScript', 'JavaScript', 'Vue 3', 'React', 'Node.js', 'API REST', 'SQL', 'PostgreSQL'],
  },
  {
    groupe: 'Outillage',
    items: ['Git', 'GitHub Actions', 'CI/CD', 'Docker'],
  },
  {
    groupe: 'Architecture et SI',
    items: ['Architecture des SI', 'Architecture de données', 'Sécurité des données'],
  },
  {
    groupe: 'Coordination',
    items: ['Analyse des besoins', 'Pilotage des évolutions', 'Coordination multi-acteurs', 'Management d’équipe'],
  },
]

export const formations = [
  { periode: '2024 – 2026', intitule: 'Titre RNCP niveau 7 (Bac+5), Expert en architecture informatique, option architecture de données', ecole: 'École 42, Perpignan' },
  { periode: '2023 – 2024', intitule: 'Graduate Développeur mobile iOS', ecole: 'Studi, à distance' },
  { periode: '2022 – 2024', intitule: 'Tronc commun, développement logiciel', ecole: 'École 42, Perpignan' },
  { periode: '1997', intitule: 'Baccalauréat économique et social', ecole: 'Lycée François Arago, Perpignan' },
]

export const engagement = {
  nom: 'ProxyGirl’s',
  role: 'Co-fondatrice',
  description: 'Association qui promeut les métiers du numérique auprès des femmes.',
}

export const langues = 'Français, langue maternelle. Anglais, niveau B1. Espagnol, notions.'

export interface EtapeMethode {
  titre: string
  escale: string
  qa: string
}

// Section « Ma méthode » : la même démarche, à l’escale et en QA.
export const methode: EtapeMethode[] = [
  {
    titre: 'Préparer',
    escale: 'Avant chaque vol : programme, ressources, devis de masse et centrage. Rien ne part sans préparation.',
    qa: 'Avant chaque recette : analyse des besoins, plan de test et cas de test qui couvrent les parcours critiques.',
  },
  {
    titre: 'Contrôler',
    escale: 'Check-lists avant la fermeture des portes : chaque point vérifié, dans l’ordre, à chaque fois.',
    qa: 'Tests E2E automatisés avec Playwright et Cypress, non-régression avant chaque mise en production.',
  },
  {
    titre: 'Gérer les aléas',
    escale: 'Retard, panne, météo : qualifier vite, prévenir les bons interlocuteurs, trouver une solution.',
    qa: 'Une anomalie détectée : la reproduire, la qualifier, la suivre avec le produit et le développement jusqu’à sa correction.',
  },
  {
    titre: 'Améliorer',
    escale: 'Rédaction des procédures, formation des nouveaux agents, retour d’expérience après chaque incident.',
    qa: 'Documentation des tests, partage des bonnes pratiques, amélioration continue des process qualité.',
  },
]

// Terminal du haut de page : les « tests » lancés sur le profil.
export const tests: { suite: string; titre: string; duree: number }[] = [
  { suite: 'qa', titre: 'tests E2E Playwright et Cypress en production chez UgoFresh', duree: 341 },
  { suite: 'dev', titre: 'Vue 3, React, TypeScript, Node.js, PostgreSQL', duree: 156 },
  { suite: 'architecture', titre: 'formation RNCP 7 en architecture informatique et données', duree: 187 },
  { suite: 'entrepreneuriat', titre: 'présidente d’EVieDev, éditrice d’Artizio', duree: 203 },
  { suite: 'engagement', titre: 'co-fondatrice de ProxyGirl’s', duree: 98 },
  { suite: 'terrain', titre: '24 ans de gestion des opérations et des imprévus', duree: 212 },
]
