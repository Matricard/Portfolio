# Portfolio Professionnel — Mathieu Ricard (Angular)

Site portfolio moderne et réactif développé en **Angular 22** (Standalone Components, Signals & Control Flow `@if` / `@for`) avec **Tailwind CSS**.

🌐 **Projet phare en vedette** : [cherryhud.com](https://cherryhud.com/)  
💼 **LinkedIn** : [linkedin.com/in/math-ricard](https://www.linkedin.com/in/math-ricard/)  
💻 **GitHub** : [github.com/Matricard](https://github.com/Matricard)

---

## ✨ Fonctionnalités clés du Portfolio

- 🅰️ **Développé avec Angular** :
  - **Standalone Components** (`App`, `IconComponent`).
  - **Angular Signals** (`signal`, `computed`, `effect`) pour une réactivité optimale sans RxJS overhead.
  - **Nouveau Control Flow** (`@if`, `@for`, `@let`) pour des templates légers et lisibles.
- 🍒 **Vitrine CherryHud Interactive** :
  - Simulateur d'overlay en direct avec sélecteur d'ancrage aux 4 coins d'écran (*Haut-G, Haut-D, Bas-G, Bas-D*).
  - Graphique de frametime (sparklines) animé et jitter temps réel de FPS.
  - Liens vers le site officiel [cherryhud.com](https://cherryhud.com/), le code source GitHub et les téléchargements `.dmg`.
- 💼 **Parcours professionnel complet (CV)** :
  - **Progi** : Solutions SaaS automobile & assurance, C#, ASP.NET Core, EF Core, SQL Server, Vue.js, tests E2E.
  - **Rockwell Automation** : Assurance qualité, C#, .NET Framework, PowerShell, MSBuild, CI/CD.
  - **Epsilia** : Émulateur de véhicule industriel (WPF), ERP/WMS/MES, app mobile autonome.
  - **MCDI Security Products** : Géolocalisation Mission Control Board, refactorisation backend.
- 🌐 **Bilingue Dynamique (FR / EN)** :
  - Changement instantané de langue sans rechargement de page.
  - Sauvegarde automatique dans le `localStorage`.
- 🌓 **Thème Sombre / Clair** :
  - Esthétique sombre moderne (glassmorphism, accents néon, grille subtile).
  - Bascule en un clic avec synchronisation sur la balise `<html>`.
- 🛠️ **Filtrage des projets & Matrice de compétences** :
  - Filtre interactif par univers (*Backend & .NET*, *Bureau & Mobile*, *IA & Outils*).
  - 6 catégories de compétences avec mise en avant visuelle.
- 📋 **Interactions pratiques** :
  - Copie d'email en un clic avec notification toast animée.
  - Formulaire de contact avec génération de mailto direct.
- 🚀 **Déploiement GitHub Pages Automatique** :
  - Workflow GitHub Actions prêt à l'emploi (`.github/workflows/deploy.yml`).

---

## 🛠️ Stack Technique

- **Framework** : Angular 22 (Standalone & Signals)
- **Styling** : Tailwind CSS v4 & PostCSS
- **Icônes** : Composant SVG haute fidélité autonome
- **Polices** : Plus Jakarta Sans & JetBrains Mono

---

## 🚀 Lancer le projet en local

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Démarrer le serveur Angular :
   ```bash
   npm start
   ```

3. Ouvrir votre navigateur sur [http://localhost:4200](http://localhost:4200).

---

## 📦 Compiler pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans `dist/portfolio-app/browser/`.

---

## 🌐 Déploiement sur GitHub Pages

Un workflow automatisé est déjà présent dans `.github/workflows/deploy.yml`.

1. Poussez votre code sur GitHub :
   ```bash
   git add .
   git commit -m "feat: portfolio complet en Angular avec vitrine CherryHud"
   git push -u origin main
   ```
2. Dans votre dépôt GitHub sur le web, activez GitHub Pages :
   - Allez dans **Settings** > **Pages**.
   - Sous **Build and deployment** > **Source**, choisissez **GitHub Actions**.
3. Votre site sera automatiquement en ligne à l'adresse : `https://matricard.github.io/Portfolio/` !

---

© Mathieu Ricard. Sous licence MIT.
