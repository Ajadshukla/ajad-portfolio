import {
   Component, AfterViewInit, OnDestroy, inject, ElementRef, PLATFORM_ID, signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ScrollService } from '../../services/scroll.service';
import { SkillCategory } from '../../models/portfolio.model';

@Component({
   selector: 'app-skills',
   standalone: true,
   imports: [CommonModule],
   template: `
    <section id="skills" class="py-24 bg-dark-800/50 relative overflow-hidden">
      <!-- background accent -->
      <div class="absolute inset-0 bg-glow-primary pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16 reveal">
          <span class="section-pill">⚡ Capabilities</span>
          <h2 class="section-title text-white">My <span class="gradient-text">Skills</span></h2>
          <div class="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          <p class="text-slate-400 mt-4 max-w-xl mx-auto">
            A curated set of technologies and concepts I leverage to build production-ready applications.
          </p>
        </div>

        <!-- Skill categories -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          @for (category of data.skills; track category.name) {
            <div class="reveal glass rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group">
              <div class="flex items-center gap-3 mb-5">
                <span class="text-2xl">{{ category.icon }}</span>
                <h3 class="font-display font-semibold text-white">{{ category.name }}</h3>
              </div>

              <div class="space-y-3">
                @for (skill of category.items; track skill.name) {
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-slate-300">{{ skill.name }}</span>
                      <span class="text-primary-400 font-medium">{{ skill.level }}%</span>
                    </div>
                    <div class="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        class="skill-bar-fill h-full"
                        [style.width]="barVisible() ? skill.level + '%' : '0%'">
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Quick chip cloud -->
        <div class="mt-16 reveal">
          <p class="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest">Also familiar with</p>
          <div class="flex flex-wrap justify-center gap-3">
            @for (chip of extraChips; track chip) {
              <span class="skill-chip">{{ chip }}</span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
   private platformId = inject(PLATFORM_ID);
   private elRef = inject(ElementRef);
   private scrollSvc = inject(ScrollService);
   private svc = inject(PortfolioDataService);

   data = this.svc.data;
   barVisible = signal(false);

   extraChips = [
      'Postman', 'VS Code', 'Visual Studio', 'Linux', 'Render', 'Swagger',
      'DBMS', 'OOP', 'OS', 'Computer Networks', 'Agile / Scrum',
   ];

   ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
         const els = this.elRef.nativeElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
         this.scrollSvc.observe(els);

         // Animate skill bars when section enters view
         const sectionEl = this.elRef.nativeElement.querySelector('section');
         const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { this.barVisible.set(true); io.disconnect(); } },
            { threshold: 0.2 }
         );
         if (sectionEl) io.observe(sectionEl);
      }
   }

   ngOnDestroy(): void {
      // Cleanup if needed
   }
}
