import { Injectable, signal, computed, effect } from '@angular/core';
import { Language, Theme, JobExperience, SkillGroup } from '../models/portfolio.model';
import { TRANSLATIONS, EXPERIENCES, SKILL_GROUPS } from '../data/translations.data';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Reactive Signals
  readonly currentLang = signal<Language>('fr');
  readonly currentTheme = signal<Theme>('light');
  readonly isMobileMenuOpen = signal<boolean>(false);

  // Structured data
  readonly experiences: JobExperience[] = EXPERIENCES;
  readonly skillGroups: SkillGroup[] = SKILL_GROUPS;

  // Computed translations based on current language
  readonly t = computed(() => TRANSLATIONS[this.currentLang()]);

  constructor() {
    // Load initial preferences from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('portfolio_lang') as Language;
      if (savedLang === 'fr' || savedLang === 'en') {
        this.currentLang.set(savedLang);
      }

      const savedTheme = localStorage.getItem('portfolio_theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.currentTheme.set(savedTheme);
      } else {
        this.currentTheme.set('light');
      }
    }

    // Effect for Theme class on <html>
    effect(() => {
      const theme = this.currentTheme();
      if (typeof document !== 'undefined') {
        if (theme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('portfolio_theme', theme);
        }
      }
    });

    // Effect for Lang persistence
    effect(() => {
      const lang = this.currentLang();
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('portfolio_lang', lang);
      }
    });
  }

  toggleLanguage(): void {
    this.currentLang.update(l => (l === 'fr' ? 'en' : 'fr'));
  }

  toggleTheme(): void {
    this.currentTheme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  readonly email = 'mat.ricard3@outlook.com';
  readonly isEmailCopied = signal<boolean>(false);

  openLinkedIn(): void {
    if (typeof window !== 'undefined') {
      window.open('https://www.linkedin.com/in/math-ricard/', '_blank', 'noopener,noreferrer');
    }
  }

  openEmail(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${this.email}`;
    }
  }

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.email).then(() => {
        this.isEmailCopied.set(true);
        setTimeout(() => this.isEmailCopied.set(false), 2200);
      });
    }
  }
}
