import {
   Component, AfterViewInit, OnDestroy, inject, ElementRef, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
   selector: 'app-projects',
   standalone: true,
   imports: [CommonModule],
   template: `
    <section id="projects" class="py-24 bg-dark-800/50 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-1/2 h-full bg-glow-primary opacity-50 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16 reveal">
          <span class="section-pill">🛠️ Portfolio</span>
          <h2 class="section-title text-white">Featured <span class="gradient-text">Projects</span></h2>
          <div class="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          <p class="text-slate-400 mt-4 max-w-xl mx-auto">
            A selection of real-world projects demonstrating full-stack engineering and AI integration.
          </p>
        </div>

        <!-- Projects grid -->
        <div class="grid md:grid-cols-2 gap-8">
          @for (project of data.projects; track project.title; let i = $index) {
            <div
              class="project-card reveal group"
              [class.md:col-span-2]="project.featured && i === 0">
              <div class="p-6 md:p-8">
                <!-- Header -->
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    @if (project.featured) {
                      <span class="inline-block text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 mb-2 font-medium">
                        ⭐ Featured
                      </span>
                    }
                    <h3 class="font-display font-bold text-xl text-white">{{ project.title }}</h3>
                    <p class="text-primary-400 text-sm font-medium mt-0.5">{{ project.subtitle }}</p>
                  </div>
                  <span class="text-xs text-slate-500 flex-shrink-0 pt-1">{{ project.period }}</span>
                </div>

                <p class="text-slate-400 text-sm leading-relaxed mb-5">{{ project.description }}</p>

                <!-- Highlights -->
                <ul class="space-y-2 mb-5">
                  @for (highlight of project.highlights; track highlight) {
                    <li class="flex items-start gap-2 text-slate-400 text-sm">
                      <span class="text-accent-400 mt-0.5 flex-shrink-0">▹</span>
                      {{ highlight }}
                    </li>
                  }
                </ul>

                <!-- Tech stack -->
                <div class="flex flex-wrap gap-2 mb-5">
                  @for (tech of project.techStack; track tech) {
                    <span class="text-xs px-2.5 py-1 rounded-full bg-dark-700 text-slate-300 border border-dark-600 font-mono">{{ tech }}</span>
                  }
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-3 pt-2 border-t border-white/5">
                  @if (project.githubUrl) {
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-medium group/link">
                      <svg class="w-4 h-4 group-hover/link:text-primary-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      View Code
                    </a>
                  }
                  @if (project.liveUrl) {
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Live Demo
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <!-- GitHub CTA -->
        <div class="text-center mt-12 reveal">
          <a
            href="https://github.com/Ajadshukla"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline inline-flex">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
   private platformId = inject(PLATFORM_ID);
   private elRef = inject(ElementRef);
   private scrollSvc = inject(ScrollService);
   private svc = inject(PortfolioDataService);
   data = this.svc.data;

   ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
         const els = this.elRef.nativeElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
         this.scrollSvc.observe(els);
      }
   }
   ngOnDestroy(): void { }
}
