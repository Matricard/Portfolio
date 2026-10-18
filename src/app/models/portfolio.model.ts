export type Language = 'fr' | 'en';
export type Theme = 'dark' | 'light';

export interface JobExperience {
  company: string;
  roleFr: string;
  roleEn: string;
  periodFr: string;
  periodEn: string;
  durationFr?: string;
  durationEn?: string;
  badgeFr: string;
  badgeEn: string;
  dateBadgeFr: string;
  dateBadgeEn: string;
  colorClass: string;
  accentBg: string;
  bulletsFr: string[];
  bulletsEn: string[];
  technologies: string[];
}

export interface SkillGroup {
  id: string;
  titleFr: string;
  titleEn: string;
  icon: string;
  colorClass: string;
  skills: { name: string; isHighlight?: boolean }[];
}
