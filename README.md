# Esprit Canin — Frontend

Interface web du club d'éducation canine **Esprit Canin** : espace public (vitrine, inscription, connexion), espace adhérent (chiens, séances, inscriptions), espace coach et back-office d'administration.

Projet fil rouge réalisé dans le cadre du titre **Concepteur Développeur d'Applications (CDA – niveau 6)**, Metz Numeric School, promotion 2025-2026.

Cette application consomme l'API REST [Esprit Canin — Backend](../../Club-Canin-BackEnd).

---

## Stack technique

| Domaine | Technologie |
|---|---|
| Framework | Angular 21 (composants standalone) |
| Langage | TypeScript 5.9 |
| Styles | Tailwind CSS 4 |
| Icônes | lucide-angular |
| Réactivité | Signals Angular + RxJS |
| Tests | Vitest |
| Formatage | Prettier |
| Gestionnaire de paquets | npm |

---

## Prérequis

- **Node.js** (version compatible Angular 21, Node 20+ recommandé)
- **npm 11+**
- Le **backend Esprit Canin** démarré sur `http://localhost:8080`

---

## Installation

```bash
npm install
```

---

## Lancement

```bash
npm start
# ou
ng serve
```

L'application est servie sur **http://localhost:4200/** et se recharge automatiquement à chaque modification.

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm start` | Serveur de développement (http://localhost:4200) |
| `npm run build` | Build de production dans `dist/` |
| `npm run watch` | Build incrémental en mode développement |
| `npm test` | Tests unitaires (Vitest) |

---

## Structure du projet

```
src/app/
├── components/      Composants réutilisables (navbar, sidebar admin, dialog de confirmation, toast)
├── layouts/         Layouts de page (ex : admin-layout avec sidebar)
├── pages/           Pages de l'application
│   └── admin/       Back-office (dashboard, gestion utilisateurs, séances, races, etc.)
├── services/        Services d'accès à l'API (un par ressource) + auth
├── interceptors/    Intercepteurs HTTP (ajout du JWT, gestion des erreurs)
├── models/          Interfaces TypeScript (miroir des entités/DTOs back)
├── validators/      Validateurs de formulaire personnalisés
└── utils/           Fonctions utilitaires (helpers d'affichage, etc.)
```

---

## Conventions

- **Composants standalone** (pas de NgModule).
- **Injection** via `inject(...)`, initialisation des données HTTP dans `ngOnInit`.
- **Signals** pour l'état réactif local ; `computed()` pour les valeurs dérivées.
- **Tri et filtres déportés côté serveur** : le front envoie les critères, le back renvoie les données prêtes à afficher.
- **Structure/layout** alignés sur les maquettes ; **couleurs** issues de la charte post-audit WCAG (accessibilité RGAA).
- **Authentification** : le JWT renvoyé à la connexion est stocké côté client puis injecté dans chaque requête via un intercepteur HTTP. Des guards de route protègent les espaces selon le rôle.

---

## Configuration de l'API

L'URL de base de l'API est consommée par les services (`services/`). Vérifier qu'elle pointe vers le backend (`http://localhost:8080` en développement) avant de lancer l'application.
