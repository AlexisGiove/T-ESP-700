# ARGOS - Landing Page

Landing page interactive pour ARGOS, une plateforme open-source d'analyse prédictive basée sur l'IA.

## Technologies

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Fira Code** (police monospace pour le terminal)

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## Fonctionnalités

### Terminal Interactif

- Commandes disponibles :
  - `help` - Liste des commandes
  - `logo` - Logo ASCII ARGOS
  - `summary` - Résumé du projet
  - `ideation` - Opportunité et problème adressé
  - `pbs` - Structure de découpage produit (PBS)
  - `functions` - Description des fonctions haut niveau
  - `about` - Informations sur ARGOS
  - `usecases` - Cas d'usage
  - `ethics` - Charte éthique
  - `innovation` - Originalité et innovation du projet
  - `team` - Équipe et recrutement
  - `roadmap` - Feuille de route
  - `contact` - Informations de contact
  - `clear` - Effacer l'historique

### Mode Présentation Classique

- Vue scrollable avec sections :
  - SUMMARY
  - IDEATION
  - PBS
  - FUNCTIONS
  - ABOUT
  - USE CASES
  - ETHICS
  - INNOVATION
  - TECHNO & STACK
  - TEAM & RECRUITMENT
  - ROADMAP
  - CONTACT

### Design

- Thème sombre cyber/high-tech
- Couleurs néon (vert/turquoise)
- Animations typewriter au démarrage
- Curseur clignotant
- Responsive (desktop + mobile)

## Structure du Projet

```
src/
├── components/
│   ├── Terminal.tsx      # Composant terminal interactif
│   └── ClassicView.tsx   # Vue présentation classique
├── App.tsx               # Composant principal
├── main.tsx              # Point d'entrée
├── types.ts              # Types TypeScript
└── index.css             # Styles Tailwind
```

## Commandes Disponibles

Tapez les commandes dans le terminal ou cliquez sur les boutons rapides :

- `help` - Affiche toutes les commandes disponibles
- `logo` - Affiche le logo ASCII ARGOS
- `summary` - Résumé du projet (50 mots)
- `ideation` - Opportunité et problème adressé
- `pbs` - Structure de découpage produit (PBS)
- `functions` - Description des 5 fonctions haut niveau
- `about` - Description du projet ARGOS
- `usecases` - 4 cas d'usage concrets
- `ethics` - Charte éthique du projet
- `innovation` - Originalité et innovation
- `team` - Informations sur l'équipe et recrutement
- `roadmap` - Timeline sur 4 semestres
- `contact` - Liens GitHub, Notion et email
- `clear` - Efface l'historique du terminal

## Logo

Placez votre logo ARGOS dans le dossier `public/` sous le nom `logo-argos.png`. Si le fichier n'existe pas, un placeholder sera affiché.

## Responsive

Le design est entièrement responsive :
- Desktop : terminal centré (max-width: 900px)
- Mobile : terminal en pleine largeur, boutons en grille

## Personnalisation

Les couleurs peuvent être modifiées dans `tailwind.config.js` :

```js
colors: {
  'argos-dark': '#02060B',
  'argos-neon': '#60F5C2',
  'argos-turquoise': '#5FF7E6',
}
```

## Licence

Open Source - ARGOS Project

