import { Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'cpd-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(this.readInitialTheme() === 'dark');

  constructor() {
    this.apply(this.isDark());
  }

  toggle(): void {
    this.isDark.update((value) => !value);
    this.apply(this.isDark());
    this.persist(this.isDark() ? 'dark' : 'light');
  }

  private apply(isDark: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    const mode: ThemeMode = isDark ? 'dark' : 'light';
    document.documentElement.dataset['theme'] = mode;
    document.documentElement.classList.toggle('dark-theme', isDark);
    document.documentElement.classList.toggle('light-theme', !isDark);
  }

  private readInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private persist(mode: ThemeMode): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(STORAGE_KEY, mode);
  }
}
