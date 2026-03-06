import {
  Component, OnInit, OnDestroy, AfterViewInit, inject, signal,
  ElementRef, ViewChild, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ScrollService } from '../../services/scroll.service';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; opacity: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Canvas particle background -->
      <canvas #particleCanvas class="absolute inset-0 w-full h-full"></canvas>

      <!-- Gradient overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-dark-900/60 to-dark-900 pointer-events-none"></div>
      <div class="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">

          <!-- Text content -->
          <div class="space-y-6 animate-fade-in-up">
            <!-- Badge -->
            <div class="flex items-center gap-2">
              <span class="section-pill">👋 Available for Opportunities</span>
            </div>

            <!-- Name -->
            <h1 class="font-display font-bold leading-tight">
              <span class="text-5xl md:text-6xl lg:text-7xl text-white block">Hi, I'm</span>
              <span class="text-5xl md:text-6xl lg:text-7xl gradient-text text-glow block">Ajad Shukla</span>
            </h1>

            <!-- Typing tagline -->
            <div class="flex items-center gap-2 h-10">
              <span class="text-lg md:text-xl text-slate-300 font-medium">
                {{ typedText() }}
              </span>
              <span class="w-0.5 h-6 bg-primary-400 animate-pulse inline-block"></span>
            </div>

            <!-- Bio -->
            <p class="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
              B.Tech CSE Student · Full-Stack Developer · Java OOP Master · AI Enthusiast.
              Building scalable systems from Angular frontends to .NET & MERN backends.
            </p>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-4 pt-2">
              <button (click)="scrollTo('projects')" class="btn-primary group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
                View Projects
              </button>
              <button (click)="scrollTo('contact')" class="btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Contact Me
              </button>
              <!-- Resume button group -->
              <div class="flex items-center gap-1">
                <a
                  href="ajad resumee.pdf"
                  download="Ajad_Shukla_Resume.pdf"
                  class="btn-outline group flex items-center gap-2"
                  title="Download Resume">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Resume
                </a>
                <a
                  href="ajad resumee.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-accent-400 hover:border-accent-500/50 transition-all duration-300 hover:-translate-y-0.5 border border-white/10"
                  title="Preview Resume">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Social -->
            <div class="flex items-center gap-4 pt-2">
              @for (link of data.social; track link.label) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="link.label"
                  class="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400
                         hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1">
                  <span [innerHTML]="link.icon"></span>
                </a>
              }
            </div>
          </div>

          <!-- Profile photo -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative w-72 h-72 md:w-96 md:h-96">
              <!-- Spinning ring -->
              <div class="absolute inset-0 rounded-full"
                   style="background: conic-gradient(from 0deg, #6366f1, #34d399, #6366f1); animation: spin 8s linear infinite; padding: 3px;">
                <div class="w-full h-full rounded-full bg-dark-900"></div>
              </div>
              <!-- Glow -->
              <div class="absolute inset-4 rounded-full bg-primary-600/20 blur-xl"></div>
              <!-- Photo -->
              <div class="absolute inset-3 rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src="ajad.png.png"
                  alt="Ajad Shukla"
                  class="w-full h-full object-cover object-top"
                  style="object-position: center 15%"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <!-- Fallback avatar -->
                <div class="w-full h-full bg-gradient-to-br from-primary-600 to-accent-500 items-center justify-center hidden">
                  <span class="text-6xl font-display font-bold text-white">AS</span>
                </div>
              </div>
              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-semibold text-accent-400 border border-accent-500/30 animate-bounce">
                ⚡ HCL Selected
              </div>
              <div class="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs font-semibold text-primary-300 border border-primary-500/30"
                   style="animation: bounce 2s ease infinite 1s;">
                🚀 6+ Projects
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span class="text-xs tracking-widest uppercase">Scroll</span>
          <div class="w-5 h-8 border-2 border-slate-700 rounded-full flex items-start justify-center p-1">
            <div class="w-1 h-2 bg-primary-400 rounded-full" style="animation: scroll-dot 2s ease infinite"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes scroll-dot {
      0%   { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(8px); opacity: 0; }
    }
  `],
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  private svc = inject(PortfolioDataService);

  data = this.svc.data;
  typedText = signal('');

  private particles: Particle[] = [];
  private animFrameId?: number;
  private typingInterval?: ReturnType<typeof setInterval>;
  private taglineIndex = 0;
  private charIndex = 0;
  private isDeleting = false;

  ngOnInit(): void {
    this.startTyping();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initParticles();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval);
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  scrollTo(section: string): void {
    this.scrollService.scrollTo(section);
  }

  /* ── Typing effect ── */
  private startTyping(): void {
    const taglines = this.data.taglines;
    const type = () => {
      const current = taglines[this.taglineIndex];
      if (this.isDeleting) {
        this.charIndex--;
        this.typedText.set(current.slice(0, this.charIndex));
        if (this.charIndex === 0) {
          this.isDeleting = false;
          this.taglineIndex = (this.taglineIndex + 1) % taglines.length;
        }
      } else {
        this.charIndex++;
        this.typedText.set(current.slice(0, this.charIndex));
        if (this.charIndex === current.length) {
          this.isDeleting = true;
          clearInterval(this.typingInterval);
          setTimeout(() => {
            this.typingInterval = setInterval(type, 60);
          }, 1800);
          return;
        }
      }
    };
    this.typingInterval = setInterval(type, this.isDeleting ? 50 : 90);
  }

  /* ── Canvas particle system ── */
  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = Math.min(80, Math.floor(window.innerWidth / 18));
    this.particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      this.animFrameId = requestAnimationFrame(draw);
    };
    draw();
  }
}
