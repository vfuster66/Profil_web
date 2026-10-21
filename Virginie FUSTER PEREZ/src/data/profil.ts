// Toutes les infos du site sont ici : modifiez ce fichier pour mettre le site à jour.

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
  'Avant de tester des applications, je gérais des départs d’avions. Dans les deux cas, le principe est le même : anticiper les risques, coordonner les équipes et vérifier que tout fonctionne avant le départ.',
  'Après 24 ans en exploitation aéroportuaire, je me suis reconvertie dans le développement à l’École 42. Je conçois aujourd’hui des tests fonctionnels et automatisés chez UgoFresh, et je développe des sites et applications avec mon entreprise, EVieDev.',
]

export type Statut = 'EN VOL' | 'PARTI'

export interface Depart {
  annee: string
  poste: string
  lieu: string
  statut: Statut
}

// Tableau des départs du haut de page (le plus récent en premier).
export const departs: Depart[] = [
  { annee: '2026', poste: 'DÉVELOPPEUSE QA', lieu: 'UGOFRESH', statut: 'EN VOL' },
  { annee: '2026', poste: 'PRÉSIDENTE', lieu: 'EVIEDEV', statut: 'EN VOL' },
  { annee: '2024', poste: 'ALTERNANCE QA', lieu: 'UGOFRESH', statut: 'PARTI' },
  { annee: '2024', poste: 'DÉV. MOBILE', lieu: 'CLEANSPOT', statut: 'PARTI' },
  { annee: '2022', poste: 'TRONC COMMUN', lieu: 'ÉCOLE 42', statut: 'PARTI' },
  { annee: '2021', poste: 'CHEF D’ESCALE ADJ.', lieu: 'AÉROPORT PGF', statut: 'PARTI' },
  { annee: '2017', poste: 'SUPERVISEURE ESCALE', lieu: 'AÉROPORT PGF', statut: 'PARTI' },
  { annee: '2005', poste: 'AGENTE DE TRAFIC', lieu: 'AÉROPORT PGF', statut: 'PARTI' },
  { annee: '1998', poste: 'AGENTE D’ESCALE', lieu: 'AÉROPORT PGF', statut: 'PARTI' },
]

export interface Experience {
  poste: string
  structure: string
  periode: string
  points: string[]
  etapes?: { periode: string; poste: string }[]
}

export const experiences: Experience[] = [
  {
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
    poste: 'Présidente',
    structure: 'EVieDev',
    periode: 'Depuis 2026',
    points: [
      'Création et gestion d’une entreprise de développement web.',
      'Édition d’Artizio, suite d’outils mobiles pour les artisans du bâtiment.',
      'Conception et développement de sites sur mesure avec Vue et React, du recueil des besoins à la mise en ligne.',
    ],
  },
  {
    poste: 'Développeuse full stack mobile',
    structure: 'Cleanspot',
    periode: 'Juin à septembre 2024',
    points: [
      'Application mobile de mise en relation entre propriétaires de logements et prestataires de ménage, de la maquette à la V1.',
      'Développement en autonomie du front-end et du back-end, participation aux choix d’architecture.',
    ],
  },
  {
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
}

export const projets: Projet[] = [
  {
    nom: 'Artizio',
    description:
      'Suite d’outils mobiles pour les artisans du bâtiment, éditée par EVieDev : kilomètres (Trajio), métrés (Surfacio), photos de chantier (Staggio) et notes de frais (Frezio). Trajio et Surfacio sont prêts pour les stores.',
    stack: ['Flutter', 'Dart'],
    lien: 'https://artizio.fr/',
  },
  {
    nom: 'Fuster Peinture',
    description:
      'Site d’un artisan peintre à Cabestany : présentation des services, réalisations avant et après, demande de devis et gestion des cookies conforme au RGPD.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    lien: 'https://www.fuster-peinture.fr/',
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
