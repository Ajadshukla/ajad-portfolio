import { Injectable, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'ajad_theme';

/**
 * The site is designed dark-first: no class on <html> means dark (matches the
 * original design exactly). Adding the `light` class switches to the light
 * palette defined in styles.css. Persisted per-visitor; does not follow
 * prefers-color-scheme, since dark is this site's intended default look.
 *
 * The stored preference is applied via `afterNextRender` rather than in the
 * constructor. SSR always renders the `dark` default (the server has no
 * localStorage), so flipping the signal synchronously during construction
 * would make the client's first render disagree with the server-rendered
 * HTML mid-hydration and throw NG0500. Applying it a tick later, once
 * hydration has settled, avoids that — the page itself never flashes dark
 * first because the inline script in index.html already added the `light`
 * class (a plain DOM mutation outside Angular's hydration scope) before any
 * of this runs; only the toggle icon's own state catches up a moment later.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
   private readonly platformId = inject(PLATFORM_ID);
   readonly theme = signal<Theme>('dark');

   constructor() {
      if (!isPlatformBrowser(this.platformId)) return;
      afterNextRender(() => {
         const stored = this.readStored();
         if (stored) this.theme.set(stored);
      });
   }

   toggle(): void {
      this.apply(this.theme() === 'dark' ? 'light' : 'dark');
   }

   private apply(theme: Theme): void {
      this.theme.set(theme);
      if (!isPlatformBrowser(this.platformId)) return;
      document.documentElement.classList.toggle('light', theme === 'light');
      try {
         localStorage.setItem(STORAGE_KEY, theme);
      } catch {
         // Storage unavailable (private mode) — theme just won't persist across visits.
      }
   }

   private readStored(): Theme | null {
      try {
         const value = localStorage.getItem(STORAGE_KEY);
         return value === 'light' || value === 'dark' ? value : null;
      } catch {
         return null;
      }
   }
}
