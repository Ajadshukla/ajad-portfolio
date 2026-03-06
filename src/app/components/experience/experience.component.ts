import {
  Component, AfterViewInit, OnDestroy, inject, ElementRef, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16 reveal">
          <span class="section-pill">🚀 Journey</span>
          <h2 class="section-title text-white">Experience & <span class="gradient-text">Education</span></h2>
          <div class="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">

          <!-- Experience column -->
          <div class="reveal-left">
            <h3 class="font-display font-semibold text-xl text-white mb-8 flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-sm">💼</span>
              Experience
            </h3>
            <div class="relative pl-6">
              <!-- Vertical line -->
              <div class="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/60 via-primary-600/30 to-transparent"></div>

              @for (exp of data.experience; track exp.company) {
                <div class="relative mb-8 last:mb-0">
                  <div class="timeline-dot absolute -left-4"></div>
                  <div class="glass rounded-2xl p-5 hover:border-primary-500/30 transition-all duration-300 ml-2">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 class="font-semibold text-white">{{ exp.role }}</h4>
                        <p class="text-primary-400 text-sm font-medium">{{ exp.company }}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-xs px-2 py-1 rounded-full bg-accent-500/15 text-accent-400 border border-accent-500/20 font-medium">
                          {{ exp.period }}
                        </span>
                        @if (exp.isCurrent) {
                          <div class="mt-1.5 flex items-center gap-1 justify-end">
                            <span class="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse"></span>
                            <span class="text-xs text-accent-400">Active</span>
                          </div>
                        }
                      </div>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed">{{ exp.description }}</p>
                    <div class="flex flex-wrap gap-2 mt-3">
                      @for (tag of exp.tags; track tag) {
                        <span class="text-xs px-2 py-0.5 rounded-full bg-primary-600/15 text-primary-300 border border-primary-500/20">{{ tag }}</span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Education column -->
          <div class="reveal-right">
            <h3 class="font-display font-semibold text-xl text-white mb-8 flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-accent-500/20 border border-accent-500/30 flex items-center justify-center text-sm">🎓</span>
              Education
            </h3>
            <div class="relative pl-6">
              <div class="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-accent-500/60 via-accent-500/20 to-transparent"></div>

              @for (edu of data.education; track edu.institution) {
                <div class="relative mb-8 last:mb-0">
                  <div class="w-4 h-4 rounded-full bg-accent-500 border-4 border-dark-900 absolute -left-4 top-1 z-10"
                       style="box-shadow: 0 0 12px rgba(52,211,153,0.5)">
                  </div>
                  <div class="glass rounded-2xl p-5 hover:border-accent-500/30 transition-all duration-300 ml-2">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h4 class="font-semibold text-white text-sm">{{ edu.institution }}</h4>
                      <span class="text-xs px-2 py-1 rounded-full bg-primary-600/15 text-primary-300 border border-primary-500/20 flex-shrink-0">
                        {{ edu.period }}
                      </span>
                    </div>
                    <p class="text-slate-400 text-sm">{{ edu.degree }}</p>
                    <p class="text-accent-400 text-sm font-semibold mt-2">{{ edu.score }}</p>
                  </div>
                </div>
              }
            </div>

            <!-- Certifications -->
            <h3 class="font-display font-semibold text-xl text-white mt-10 mb-6 flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-sm">🏅</span>
              Certifications
            </h3>
            <div class="grid grid-cols-2 gap-3 stagger">
              @for (cert of data.certifications; track $index) {
                <div class="reveal glass rounded-xl p-4 hover:border-yellow-500/30 transition-all duration-300">
                  <span class="text-xl block mb-2">{{ cert.icon }}</span>
                  <p class="text-white text-xs font-semibold leading-tight">{{ cert.title }}</p>
                  <p class="text-slate-500 text-xs mt-1">{{ cert.issuer }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
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
