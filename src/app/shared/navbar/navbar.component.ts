import {
   Component, OnInit, OnDestroy, inject, HostListener, PLATFORM_ID, signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

interface NavItem { label: string; section: string; }

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule],
   template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [class.glass-dark]="scrolled()"
      [class.border-b]="scrolled()"
      [class.border-white/10]="scrolled()"
      [class.py-3]="scrolled()"
      [class.py-5]="!scrolled()">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        <!-- Logo -->
        <button
          (click)="scrollTo('hero')"
          class="font-display font-bold text-xl tracking-tight cursor-pointer">
          <span class="gradient-text">Ajad</span>
          <span class="text-white">.dev</span>
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
        </div>

        <!-- Hamburger -->
        <button
          (click)="toggleMenu()"
          class="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
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
        <div class="md:hidden glass-dark border-t border-white/10 px-4 py-4 mt-1">
          <ul class="flex flex-col gap-2">
            @for (item of navItems; track item.section) {
              <li>
                <button
                  (click)="scrollTo(item.section); toggleMenu()"
                  [class.text-primary-400]="activeSection() === item.section"
                  class="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium">
                  {{ item.label }}
                </button>
              </li>
            }
            <li class="pt-2">
              <a href="mailto:ajadshukla718@gmail.com" class="btn-primary w-full justify-center text-sm">
                Hire Me
              </a>
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
