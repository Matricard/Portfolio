import { JobExperience, SkillGroup } from '../models/portfolio.model';

export const TRANSLATIONS = {
  fr: {
    // Navigation
    navAbout: "Profil",
    navProjects: "Projets",
    navExperience: "Parcours",
    navSkills: "Compétences",
    navEducation: "Formation",
    navContact: "Contact",
    btnContact: "Me Contacter",

    // Hero
    statusBadge: "Disponible pour de nouvelles opportunités",
    heroGreeting: "Bonjour, je suis",
    heroGreetingDay: "Bonjour, je suis",
    heroGreetingEvening: "Bonsoir, je suis",
    heroName: "Mathieu Ricard",
    heroRole: "Développeur Full-Stack .NET & Concepteur Logiciel",
    heroLocation: "Longueuil, Québec 🇨🇦",
    heroDesc: "Développeur Full-Stack .NET cumulant 5 ans d'expérience dans la conception de solutions Web SaaS, desktop, mobiles et industrielles. Spécialisé en C#, ASP.NET Core, EF Core, microservices et créateur de CherryHud.",
    btnViewCherryHud: "Découvrir CherryHud",
    btnViewExperience: "Voir mon parcours",
    heroCoreSkills: "Compétences principales",

    // Key Stats
    statExp: "5+ Années",
    statExpLabel: "Expertise C# & Écosystème .NET",
    statArch: "Full-Stack",
    statArchLabel: "Architecture SaaS, Web & Desktop",
    statLang: "Bilingue",
    statLangLine1: "Français langue maternelle",
    statLangLine2: "Anglais fonctionnel",
    statLangLabel: "Français langue maternelle • Anglais fonctionnel",
    statProduct: "CherryHud",
    statProductLabel: "Application macOS Open Source (MIT)",

    // Projects Section (CherryHud Spotlight)
    projectsSectionBadge: "PROJETS & RÉALISATIONS",
    projectsSectionTitle: "Projet Phare",
    projectsSectionSubtitle: "Conception et ingénierie d'applications logicielles modernes, axées sur la performance et l'expérience utilisateur.",
    chBadgeTag: "APPLICATION MACOS",
    chTagline: "Overlay natif haute performance pour jeux sous macOS (Apple Silicon)",
    chDesc: "CherryHud est un moniteur de performance in-game développé spécifiquement pour macOS. Il affiche en temps réel les FPS, un graphique de frametime (sparklines), la charge GPU/CPU unifié, les thermiques et la batterie avec un overhead système quasi nul.",
    chFeat1Title: "Sparkline de Frametime",
    chFeat1Desc: "Visualisation instantanée de la fluidité et détection en direct des micro-saccades.",
    chFeat2Title: "Smart Auto Game Mode",
    chFeat2Desc: "S'active automatiquement dès le lancement d'un jeu Metal ou 3D et disparaît au bureau.",
    chFeat3Title: "GPU, CPU & Thermiques",
    chFeat3Desc: "Suivi en direct des puces Apple Silicon, mémoire VRAM unifiée, état de charge et thermal throttling.",
    chFeat4Title: "Drag & Drop & Corner Snap",
    chFeat4Desc: "Positionnement fluide par glisser-déposer ou ancrage instantané dans les 4 coins de l'écran.",
    chBtnVisitSite: "Visiter cherryhud.com",
    chBtnGitHub: "Code source GitHub",
    chBtnDownload: "Télécharger (.dmg)",

    // Experience Section
    expSectionBadge: "PARCOURS",
    expSectionTitle: "Mon Parcours",
    expSectionSubtitle: "5 ans de réalisations concrètes en SaaS, systèmes industriels critiques, assurance qualité et formation technique.",

    // Skills Section
    skillsSectionBadge: "EXPERTISE TECHNIQUE",
    skillsSectionTitle: "Compétences & Technologies",
    skillsSectionSubtitle: "Maîtrise approfondie de l'écosystème Microsoft, du développement moderne et des méthodologies agiles.",

    // Education & Languages
    eduSectionBadge: "FORMATION",
    eduDiploma: "DEC technique en informatique",
    eduSchool: "Collège de Maisonneuve, Montréal",
    eduDate: "Diplômé en Juin 2021",
    eduDateBadge: "DIPLÔME",
    eduDesc: "Formation technique approfondie axée sur l'analyse, la programmation orientée objet, les bases de données relationnelles, les réseaux et l'architecture logicielle.",
    langSectionBadge: "PROFIL LINGUISTIQUE",
    langFrLevel: "Langue maternelle (Natif)",
    langEnLevel: "Fonctionnel (Technique & Pro)",

    // Contact Section
    contactSectionBadge: "CONTACT DIRECT",
    contactSectionTitle: "Discutons ensemble",
    contactSectionSubtitle: "Vous avez une opportunité ou un projet en tête ? Contactez-moi directement ou envoyez-moi un message !",
    contactEmailLabel: "Courriel",
    contactEmailDesc: "mat.ricard3@outlook.com",
    contactLinkedInLabel: "LinkedIn Professionnel",
    contactLinkedInDesc: "linkedin.com/in/math-ricard",
    contactGitHubLabel: "Profil GitHub",
    contactGitHubDesc: "github.com/Matricard",
    contactLocationLabel: "Localisation",
    contactLocationDesc: "Longueuil, Québec, Canada",
    btnDirectContact: "M'écrire par courriel",
    btnCopyEmail: "Copier le courriel",
    copiedText: "Courriel copié !",
    formTitle: "Envoyez-moi un message",
    formNameLabel: "Votre nom",
    formNamePlaceholder: "Ex. Jean Dupont",
    formEmailLabel: "Votre courriel",
    formEmailPlaceholder: "nom@exemple.com",
    formSubjectLabel: "Sujet",
    formSubjectPlaceholder: "Opportunité, projet, question...",
    formMessageLabel: "Message",
    formMessagePlaceholder: "Bonjour Mathieu, je vous contacte concernant...",
    formBtnSubmit: "Envoyer le message",
    formBtnSending: "Envoi en cours...",
    formSuccessTitle: "Message envoyé avec succès !",
    formSuccessDesc: "Merci, votre message a bien été transmis. Je vous répondrai dans les plus brefs délais.",
    formSendAnother: "Envoyer un autre message",
    formErrorDesc: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou m'écrire directement par courriel.",

    // Footer
    footerRights: "Tous droits réservés.",
    footerCrafted: "Développé avec Angular & Tailwind CSS",
  },

  en: {
    // Navigation
    navAbout: "Profile",
    navProjects: "Projects",
    navExperience: "Career",
    navSkills: "Skills",
    navEducation: "Education",
    navContact: "Contact",
    btnContact: "Get in Touch",

    // Hero
    statusBadge: "Open to new opportunities",
    heroGreeting: "Hello, I am",
    heroGreetingDay: "Hello, I am",
    heroGreetingEvening: "Good evening, I am",
    heroName: "Mathieu Ricard",
    heroRole: "Full-Stack .NET Developer & Software Engineer",
    heroLocation: "Greater Montreal, Quebec 🇨🇦",
    heroDesc: "Full-Stack .NET Developer with 5 years of professional experience building enterprise SaaS platforms, native desktop apps, mobile solutions, and industrial systems. Specialized in C#, ASP.NET Core, EF Core, microservices, and creator of CherryHud.",
    btnViewCherryHud: "Discover CherryHud",
    btnViewExperience: "View Career",
    heroCoreSkills: "Core Skills",

    // Key Stats
    statExp: "5+ Years",
    statExpLabel: "C# & .NET Ecosystem Expertise",
    statArch: "Full-Stack",
    statArchLabel: "SaaS, Web & Desktop Architecture",
    statLang: "Bilingual",
    statLangLine1: "Native French",
    statLangLine2: "Functional English",
    statLangLabel: "Native French • Functional English",
    statProduct: "CherryHud",
    statProductLabel: "Open Source macOS App (MIT)",

    // Projects Section (CherryHud Spotlight)
    projectsSectionBadge: "PROJECTS & PORTFOLIO",
    projectsSectionTitle: "Featured Flagship Project",
    projectsSectionSubtitle: "High-performance native software engineering and modern app development.",
    chBadgeTag: "MACOS APPLICATION",
    chTagline: "Native macOS Gaming Performance Overlay for Apple Silicon",
    chDesc: "CherryHud is a lightweight, native in-game performance monitor built for macOS. It tracks FPS, real-time frametime sparklines, unified GPU/CPU usage, thermals, and battery with virtually zero overhead.",
    chFeat1Title: "Frametime Sparkline",
    chFeat1Desc: "Visualize gameplay smoothness in real-time with low latency and instant micro-stutter detection.",
    chFeat2Title: "Smart Auto Game Mode",
    chFeat2Desc: "Automatically appears whenever a Metal or 3D game launches, and fades away quietly on your desktop.",
    chFeat3Title: "GPU, CPU & Thermals",
    chFeat3Desc: "Live Apple Silicon tracking, unified VRAM & RAM consumption, battery health, and thermal throttling.",
    chFeat4Title: "Drag & Drop or Corner Snap",
    chFeat4Desc: "Smooth drag-and-drop overlay positioning or instant snapping to any of the 4 screen corners.",
    chBtnVisitSite: "Visit cherryhud.com",
    chBtnGitHub: "GitHub Source Code",
    chBtnDownload: "Download (.dmg)",

    // Experience Section
    expSectionBadge: "CAREER",
    expSectionTitle: "Career Journey",
    expSectionSubtitle: "5 years of tangible impact across SaaS, mission-critical industrial software, QA automation, and foundational training.",

    // Skills Section
    skillsSectionBadge: "TECHNICAL EXPERTISE",
    skillsSectionTitle: "Skills & Technologies",
    skillsSectionSubtitle: "In-depth mastery of the Microsoft ecosystem, modern web technologies, and clean software engineering.",

    // Education & Languages
    eduSectionBadge: "EDUCATION",
    eduDiploma: "Technical College Degree (DEC) in Computer Science",
    eduSchool: "Collège de Maisonneuve, Montreal",
    eduDate: "Graduated June 2021",
    eduDateBadge: "DEGREE",
    eduDesc: "Rigorous technical program covering object-oriented design, relational databases, distributed networking, and software architecture.",
    langSectionBadge: "LANGUAGE PROFICIENCY",
    langFrLevel: "Native Language",
    langEnLevel: "Functional (Technical & Professional)",

    // Contact Section
    contactSectionBadge: "DIRECT CONTACT",
    contactSectionTitle: "Let's Connect",
    contactSectionSubtitle: "Have an opportunity or a project in mind? Reach out directly or send me a message!",
    contactEmailLabel: "Email",
    contactEmailDesc: "mat.ricard3@outlook.com",
    contactLinkedInLabel: "Professional LinkedIn",
    contactLinkedInDesc: "linkedin.com/in/math-ricard",
    contactGitHubLabel: "GitHub Profile",
    contactGitHubDesc: "github.com/Matricard",
    contactLocationLabel: "Location",
    contactLocationDesc: "Longueuil, Quebec, Canada",
    btnDirectContact: "Send me an email",
    btnCopyEmail: "Copy email",
    copiedText: "Email copied!",
    formTitle: "Send me a message",
    formNameLabel: "Your Name",
    formNamePlaceholder: "e.g. John Doe",
    formEmailLabel: "Your Email",
    formEmailPlaceholder: "name@example.com",
    formSubjectLabel: "Subject",
    formSubjectPlaceholder: "Opportunity, project, question...",
    formMessageLabel: "Message",
    formMessagePlaceholder: "Hello Mathieu, I'm reaching out regarding...",
    formBtnSubmit: "Send Message",
    formBtnSending: "Sending...",
    formSuccessTitle: "Message sent successfully!",
    formSuccessDesc: "Thank you, your message has been received. I will get back to you as soon as possible.",
    formSendAnother: "Send another message",
    formErrorDesc: "An error occurred while sending. Please try again or reach out directly by email.",

    // Footer
    footerRights: "All rights reserved.",
    footerCrafted: "Built with Angular & Tailwind CSS",
  }
};

export const EXPERIENCES: JobExperience[] = [
  {
    company: "Progi",
    roleFr: "Développeur Full-Stack",
    roleEn: "Full-Stack Developer",
    periodFr: "Septembre 2024 – Mai 2026",
    periodEn: "September 2024 – May 2026",
    durationFr: "1 an et 9 mois",
    durationEn: "1 year 9 months",
    badgeFr: "SaaS Automobile & Assurance",
    badgeEn: "Automotive & Insurance SaaS",
    dateBadgeFr: "Sept\u00A02024 – Mai\u00A02026",
    dateBadgeEn: "Sept\u00A02024 – May\u00A02026",
    colorClass: "bg-indigo-500",
    accentBg: "border-indigo-500/20",
    bulletsFr: [
      "Développement et évolution de solutions SaaS robustes et hautement scalables pour les secteurs automobile et de l'assurance.",
      "Mise en place de tests automatisés rigoureux (unitaires, intégration et E2E) pour fiabiliser les microservices distribués.",
      "Participation active aux raffinements techniques pour clarifier l'architecture logicielle, spécifier les besoins et estimer les tâches agiles."
    ],
    bulletsEn: [
      "Developed and scaled mission-critical SaaS solutions for the automotive and insurance industries.",
      "Implemented comprehensive automated testing (unit, integration, and E2E) to safeguard microservice reliability.",
      "Actively participated in technical refinement sessions to clarify architecture, detail specifications, and estimate agile tasks."
    ],
    technologies: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "Vue.js", "TypeScript", "Microservices", "Tests E2E & CI/CD"]
  },
  {
    company: "Rockwell Automation",
    roleFr: "Consultant en développement logiciel et assurance qualité",
    roleEn: "Software Development & QA Consultant",
    periodFr: "Avril 2023 – Novembre 2023",
    periodEn: "April 2023 – November 2023",
    durationFr: "8 mois",
    durationEn: "8 months",
    badgeFr: "Automatisation industrielle",
    badgeEn: "Industrial Automation",
    dateBadgeFr: "Avr\u00A02023 – Nov\u00A02023",
    dateBadgeEn: "Apr\u00A02023 – Nov\u00A02023",
    colorClass: "bg-cyan-500",
    accentBg: "border-cyan-500/20",
    bulletsFr: [
      "Conception et exécution de suites de tests fonctionnels manuels et automatisés avec documentation rigoureuse des résultats.",
      "Modernisation et optimisation des outils et modèles internes pour accroître la vélocité et l'efficacité des équipes d'ingénierie.",
      "Amélioration des processus de build (MSBuild) et des pipelines d'intégration continue (CI/CD)."
    ],
    bulletsEn: [
      "Conducted manual and automated functional test suites while rigorously documenting outcomes.",
      "Modernized and streamlined internal tools and templates to boost developer velocity.",
      "Enhanced continuous integration (CI/CD) pipelines and MSBuild build processes."
    ],
    technologies: ["C#", ".NET Framework", "PowerShell", "MSBuild", "CI / CD", "QA Automation"]
  },
  {
    company: "Epsilia",
    roleFr: "Développeur .NET et mobile",
    roleEn: ".NET & Mobile Developer",
    periodFr: "Juin 2021 – Février 2023",
    periodEn: "June 2021 – February 2023",
    durationFr: "1 an et 9 mois",
    durationEn: "1 year 9 months",
    badgeFr: "Systèmes ERP / WMS / MES",
    badgeEn: "Industrial ERP / WMS / MES",
    dateBadgeFr: "Juin\u00A02021 – Fév\u00A02023",
    dateBadgeEn: "Jun\u00A02021 – Feb\u00A02023",
    colorClass: "bg-purple-500",
    accentBg: "border-purple-500/20",
    bulletsFr: [
      "Conception et développement d'un émulateur temps réel complet de véhicule industriel à l'aide de WPF et C#.",
      "Maintenance évolutive et développement backend de solutions industrielles critiques (ERP, WMS et MES).",
      "Conception et implémentation d'une application mobile pour la commande et la télémétrie d'un véhicule industriel autonome."
    ],
    bulletsEn: [
      "Engineered a real-time industrial vehicle emulator from scratch using WPF and C#.",
      "Maintained and expanded mission-critical backend systems across ERP, WMS, and MES environments.",
      "Designed and implemented a custom mobile solution for autonomous industrial vehicle telemetry and control."
    ],
    technologies: ["C#", "WPF", "Flutter", "SQL", "Kotlin", "Swift", "IoT & Véhicule Autonome"]
  },
  {
    company: "MCDI Security Products Inc.",
    roleFr: "Stagiaire et développeur .NET",
    roleEn: ".NET Developer Intern",
    periodFr: "Mars 2019 – Août 2019",
    periodEn: "March 2019 – August 2019",
    durationFr: "6 mois",
    durationEn: "6 months",
    badgeFr: "Sécurité & Surveillance",
    badgeEn: "Security & Monitoring",
    dateBadgeFr: "Mars\u00A02019 – Août\u00A02019",
    dateBadgeEn: "Mar\u00A02019 – Aug\u00A02019",
    colorClass: "bg-slate-400",
    accentBg: "border-white/10",
    bulletsFr: [
      "Développement de fonctionnalités de géolocalisation et cartographie pour l'application Mission Control Board.",
      "Modernisation de l'architecture logicielle backend de MCB via l'application de patrons de conception optimisés.",
      "Implémentation de batteries de tests unitaires garantissant un niveau élevé de qualité de code et de robustesse."
    ],
    bulletsEn: [
      "Engineered real-time geolocation features for the Mission Control Board (MCB) application.",
      "Modernized the MCB backend architecture leveraging optimized software design patterns.",
      "Implemented unit test suites to guarantee code stability and software longevity."
    ],
    technologies: ["C#", "SQL", "WPF", "Entity Framework", "Tests unitaires"]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "backend",
    titleFr: "Backend & Langages",
    titleEn: "Backend & Languages",
    icon: "code",
    colorClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    skills: [
      { name: "C#", isHighlight: true },
      { name: "ASP.NET Core", isHighlight: true },
      { name: "Minimal APIs", isHighlight: true },
      { name: "Entity Framework Core", isHighlight: true },
      { name: "SQL Server / SQL", isHighlight: true },
      { name: "TypeScript", isHighlight: true },
      { name: "JavaScript", isHighlight: true },
      { name: "PowerShell" },
      { name: "Dart" }
    ]
  },
  {
    id: "architecture",
    titleFr: "Architecture & Méthodologie",
    titleEn: "Architecture & Design",
    icon: "network",
    colorClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    skills: [
      { name: "Microservices", isHighlight: true },
      { name: "RESTful APIs", isHighlight: true },
      { name: "Dependency Injection", isHighlight: true },
      { name: "MVC & MVVM" },
      { name: "Multithreading" },
      { name: "Modélisation UML" },
      { name: "Clean Architecture" }
    ]
  },
  {
    id: "frontend",
    titleFr: "Desktop, Mobile & Web",
    titleEn: "Desktop, Mobile & Web",
    icon: "layout",
    colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    skills: [
      { name: "WPF", isHighlight: true },
      { name: "macOS Native (Metal / Apple Silicon)", isHighlight: true },
      { name: "Vue.js", isHighlight: true },
      { name: "Angular", isHighlight: true },
      { name: "Flutter", isHighlight: true },
      { name: "Kotlin" },
      { name: "Swift" }
    ]
  },
  {
    id: "cloud-qa",
    titleFr: "Cloud, DevOps & Assurance Qualité",
    titleEn: "Cloud, DevOps & QA",
    icon: "cloud",
    colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    skills: [
      { name: "Azure", isHighlight: true },
      { name: "Docker", isHighlight: true },
      { name: "CI / CD Pipelines", isHighlight: true },
      { name: "Tests unitaires & intégration", isHighlight: true },
      { name: "Tests E2E" },
      { name: "Azure DevOps" },
      { name: "TeamCity & Bamboo" },
      { name: "MSBuild & Git" },
      { name: "Développement agentique IA" }
    ]
  }
];
