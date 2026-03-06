import {
  Component, OnInit, AfterViewInit, OnDestroy, inject, ElementRef, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-24 relative overflow-hidden">
      <!-- Background accent -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary-600/5 to-transparent pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-16 reveal">
          <span class="section-pill">👤 Who I Am</span>
          <h2 class="section-title text-white">About <span class="gradient-text">Me</span></h2>
          <div class="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Photo side -->
          <div class="reveal-left flex justify-center lg:justify-start">
            <div class="relative">
              <!-- Decorative grid -->
              <div class="absolute -inset-8 opacity-20">
                <div class="w-full h-full"
                     style="background-image: radial-gradient(circle, #6366f1 1px, transparent 1px); background-size: 24px 24px;"></div>
              </div>
              <!-- Photo frame -->
              <div class="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden card-glow">
                <div class="card-inner h-full overflow-hidden">
                  <img
                    src="ajad2.jpeg"
                    alt="Ajad Shukla"
                    class="w-full h-full object-cover object-top"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                  <div class="w-full h-full bg-gradient-to-br from-primary-700 to-dark-800 items-center justify-center hidden">
                    <span class="text-7xl font-display font-bold text-white/80">AS</span>
                  </div>
                </div>
              </div>
              <!-- Status badge -->
              <div class="absolute -bottom-5 -right-5 glass rounded-2xl p-4 border border-accent-500/30">
                <p class="text-xs text-slate-500 mb-1">Currently</p>
                <p class="text-sm font-semibold text-accent-400">@ HCL Training</p>
              </div>
            </div>
          </div>

          <!-- Text side -->
          <div class="space-y-6 reveal-right">
            <h3 class="font-display text-2xl md:text-3xl font-bold text-white">
              Aspiring Full-Stack Developer<br><span class="gradient-text">with a flair for AI</span>
            </h3>

            <p class="text-slate-400 leading-relaxed">
              {{ data.bio }}
            </p>
            <p class="text-slate-400 leading-relaxed">
              {{ data.bioExtra }}
            </p>

            <!-- Info grid -->
            <div class="grid grid-cols-2 gap-4 py-2">
              <div class="glass rounded-xl p-4">
                <p class="text-slate-500 text-xs mb-1">📍 Location</p>
                <p class="text-white text-sm font-medium">Prayagraj, UP</p>
              </div>
              <div class="glass rounded-xl p-4">
                <p class="text-slate-500 text-xs mb-1">🎓 Degree</p>
                <p class="text-white text-sm font-medium">B.Tech CSE</p>
              </div>
              <div class="glass rounded-xl p-4">
                <p class="text-slate-500 text-xs mb-1">📧 Email</p>
                <p class="text-primary-300 text-sm font-medium truncate">{{ data.email }}</p>
              </div>
              <div class="glass rounded-xl p-4">
                <p class="text-slate-500 text-xs mb-1">💼 Status</p>
                <p class="text-accent-400 text-sm font-medium">Open to Work</p>
              </div>
            </div>

            <!-- Stat counters -->
            <div class="grid grid-cols-4 gap-3 stagger">
              @for (stat of data.stats; track stat.label) {
                <div class="reveal text-center glass rounded-xl p-3">
                  <p class="font-display text-2xl font-bold gradient-text">{{ stat.value }}</p>
                  <p class="text-slate-500 text-xs mt-1 leading-tight">{{ stat.label }}</p>
                </div>
              }
            </div>

            <!-- Resume CTA -->
            <div class="flex items-center gap-3 pt-1">
              <a
                href="ajad resumee.pdf"
                download="Ajad_Shukla_Resume.pdf"
                class="btn-primary group flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download Resume
              </a>
              <a
                href="ajad resumee.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline group flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Preview
              </a>
            </div>

            <!-- Social links -->
            <div class="flex items-center gap-3 pt-2">
              @for (link of data.social; track link.label) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors text-sm font-medium">
                  <span [innerHTML]="link.icon"></span>
                  <span>{{ link.label }}</span>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private elRef = inject(ElementRef);
  private scrollService = inject(ScrollService);
  private svc = inject(PortfolioDataService);
  data = this.svc.data;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const els = this.elRef.nativeElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      this.scrollService.observe(els);
    }
  }
  ngOnDestroy(): void { }
}
