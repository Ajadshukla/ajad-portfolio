import {
   Component, OnInit, OnDestroy, inject, HostListener, PLATFORM_ID, signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { ThemeService } from '../../services/theme.service';

interface NavItem { label: string; section: string; }

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule],
   template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [class.glass-dark]="scrolled()"
      [class.py-3]="scrolled()"
      [class.py-5]="!scrolled()">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        <!-- Logo -->
        <button
          (click)="scrollTo('hero')"
          class="font-display font-bold text-xl tracking-tight cursor-pointer">
          <span class="gradient-text">Ajad</span>
          <span class="text-ink">.dev</span>
        </button>

        <!-- Desktop links -->
        <ul class="hidden md:flex items-center gap-8">
          @for (item of navItems; track item.section) {
            <li>
              <button
                (click)="scrollTo(item.section)"
                [class.active]="activeSection() === item.section"
                class="nav-link cursor-pointer bg-transparent border-none p-0">
                {{ item.label }}
              </button>
            </li>
          }
        </ul>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-3">
          <a href="mailto:ajadshukla718@gmail.com" class="btn-primary text-sm px-5 py-2">
            Hire Me
          </a>
          <button
            (click)="theme.toggle()"
            class="relative w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300 overflow-hidden"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
            title="Toggle light / dark theme">
            <!-- Sun -->
            <svg
              class="w-5 h-5 absolute transition-all duration-500"
              [class.opacity-100]="theme.theme() === 'light'"
              [class.rotate-0]="theme.theme() === 'light'"
              [class.opacity-0]="theme.theme() === 'dark'"
              [class.rotate-90]="theme.theme() === 'dark'"
              [class.scale-0]="theme.theme() === 'dark'"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 0l-.7.7M6.34 17.66l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <!-- Moon -->
            <svg
              class="w-5 h-5 absolute transition-all duration-500"
              [class.opacity-100]="theme.theme() === 'dark'"
              [class.rotate-0]="theme.theme() === 'dark'"
              [class.opacity-0]="theme.theme() === 'light'"
              [class.-rotate-90]="theme.theme() === 'light'"
              [class.scale-0]="theme.theme() === 'light'"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z"/>
            </svg>
          </button>
        </div>

        <!-- Hamburger -->
        <button
          (click)="toggleMenu()"
          class="md:hidden p-2 rounded-lg text-slate-400 hover:text-ink hover:bg-[var(--glass-bg)] transition-colors"
          aria-label="Toggle menu">
          @if (!menuOpen()) {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          }
        </button>
      </nav>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div class="md:hidden glass-dark border-t border-[var(--glass-border)] px-4 py-4 mt-1">
          <ul class="flex flex-col gap-2">
            @for (item of navItems; track item.section) {
              <li>
                <button
                  (click)="scrollTo(item.section); toggleMenu()"
                  [class.text-primary-400]="activeSection() === item.section"
                  class="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-ink hover:bg-[var(--glass-bg)] transition-colors text-sm font-medium">
                  {{ item.label }}
                </button>
              </li>
            }
            <li class="pt-2 flex items-center gap-3">
              <a href="mailto:ajadshukla718@gmail.com" class="btn-primary flex-1 justify-center text-sm">
                Hire Me
              </a>
              <button
                (click)="theme.toggle()"
                class="w-11 h-11 flex-shrink-0 rounded-full glass flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
                [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
                @if (theme.theme() === 'dark') {
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z"/>
                  </svg>
                } @else {
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 0l-.7.7M6.34 17.66l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                }
              </button>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
   private platformId = inject(PLATFORM_ID);
   private scrollService = inject(ScrollService);
   readonly theme = inject(ThemeService);

   scrolled = signal(false);
   menuOpen = signal(false);
   activeSection = signal('hero');

   navItems: NavItem[] = [
      { label: 'Home', section: 'hero' },
      { label: 'About', section: 'about' },
      { label: 'Skills', section: 'skills' },
      { label: 'Experience', section: 'experience' },
      { label: 'Projects', section: 'projects' },
      { label: 'Contact', section: 'contact' },
   ];

   @HostListener('window:scroll')
   onScroll(): void {
      if (!isPlatformBrowser(this.platformId)) return;
      this.scrolled.set(window.scrollY > 30);
      this.updateActiveSection();
   }

   ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
         this.scrolled.set(window.scrollY > 30);
      }
   }

   ngOnDestroy(): void { }

   scrollTo(section: string): void {
      this.scrollService.scrollTo(section);
   }

   toggleMenu(): void {
      this.menuOpen.update(v => !v);
   }

   private updateActiveSection(): void {
      for (const item of [...this.navItems].reverse()) {
         const el = document.getElementById(item.section);
         if (el && window.scrollY >= el.offsetTop - 120) {
            this.activeSection.set(item.section);
            return;
         }
      }
   }
}
