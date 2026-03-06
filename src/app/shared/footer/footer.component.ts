import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
   selector: 'app-footer',
   standalone: true,
   imports: [CommonModule],
   template: `
    <footer class="relative bg-dark-900 border-t border-white/5 pt-12 pb-8">
      <!-- Top glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">

          <!-- Brand -->
          <div class="text-center md:text-left">
            <p class="font-display font-bold text-xl">
              <span class="gradient-text">Ajad</span><span class="text-white">.dev</span>
            </p>
            <p class="text-slate-500 text-sm mt-1">Building the future, one commit at a time.</p>
          </div>

          <!-- Social -->
          <div class="flex items-center gap-4">
            @for (link of data.social; track link.label) {
              <a
                [href]="link.url"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="link.label"
                class="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300">
                <span [innerHTML]="link.icon"></span>
              </a>
            }
          </div>

          <!-- Copyright -->
          <p class="text-slate-600 text-sm text-center md:text-right">
            &copy; {{ year }} Ajad Shukla.<br class="hidden md:block">
            <span class="text-slate-700">Designed & Built with ❤️</span>
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
   private svc = inject(PortfolioDataService);
   data = this.svc.data;
   year = new Date().getFullYear();
}
