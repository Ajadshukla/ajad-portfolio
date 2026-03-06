import {
   Component, AfterViewInit, OnDestroy, inject, ElementRef, PLATFORM_ID, signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ScrollService } from '../../services/scroll.service';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
   selector: 'app-contact',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   template: `
    <section id="contact" class="py-24 relative overflow-hidden">
      <!-- BG -->
      <div class="absolute inset-0 bg-glow-primary opacity-60 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16 reveal">
          <span class="section-pill">📬 Let's Talk</span>
          <h2 class="section-title text-white">Get In <span class="gradient-text">Touch</span></h2>
          <div class="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          <p class="text-slate-400 mt-4 max-w-xl mx-auto">
            Have a project idea, want to collaborate, or just say hi? My inbox is always open.
          </p>
        </div>

        <div class="grid lg:grid-cols-5 gap-12">
          <!-- Info cards -->
          <div class="lg:col-span-2 space-y-5 reveal-left">
            <div class="glass rounded-2xl p-5 flex items-start gap-4 hover:border-primary-500/30 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-xl flex-shrink-0">📧</div>
              <div>
                <p class="text-slate-500 text-sm mb-1">Email</p>
                <a href="mailto:ajadshukla718@gmail.com" class="text-white font-medium hover:text-primary-400 transition-colors">
                  ajadshukla718&#64;gmail.com
                </a>
              </div>
            </div>

            <div class="glass rounded-2xl p-5 flex items-start gap-4 hover:border-primary-500/30 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-xl flex-shrink-0">📱</div>
              <div>
                <p class="text-slate-500 text-sm mb-1">Phone</p>
                <a href="tel:+919682860020" class="text-white font-medium hover:text-primary-400 transition-colors">
                  +91 96828 60020
                </a>
              </div>
            </div>

            <div class="glass rounded-2xl p-5 flex items-start gap-4 hover:border-primary-500/30 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-xl flex-shrink-0">📍</div>
              <div>
                <p class="text-slate-500 text-sm mb-1">Location</p>
                <p class="text-white font-medium">Prayagraj, Uttar Pradesh, India</p>
              </div>
            </div>

            <!-- Social -->
            <div class="glass rounded-2xl p-5">
              <p class="text-slate-500 text-sm mb-3">Find me on</p>
              <div class="flex gap-3">
                @for (link of data.social; track link.label) {
                  <a
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="link.label"
                    class="w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1">
                    <span [innerHTML]="link.icon"></span>
                  </a>
                }
              </div>
            </div>
          </div>

          <!-- Contact form -->
          <div class="lg:col-span-3 reveal-right">
            <div class="glass rounded-2xl p-6 md:p-8">
              @if (!submitted()) {
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                  <!-- Name -->
                  <div class="relative mb-6">
                    <input
                      id="name"
                      type="text"
                      formControlName="name"
                      placeholder="Your Name"
                      class="floating-input"
                      [class.border-red-500]="isInvalid('name')">
                    <label for="name" class="floating-label">Your Name</label>
                    @if (isInvalid('name')) {
                      <p class="text-red-400 text-xs mt-1 ml-1">
                        @if (form.get('name')?.errors?.['required']) { Name is required. }
                        @if (form.get('name')?.errors?.['minlength']) { Name must be at least 2 characters. }
                      </p>
                    }
                  </div>

                  <!-- Email -->
                  <div class="relative mb-6">
                    <input
                      id="email"
                      type="email"
                      formControlName="email"
                      placeholder="Your Email"
                      class="floating-input"
                      [class.border-red-500]="isInvalid('email')">
                    <label for="email" class="floating-label">Your Email</label>
                    @if (isInvalid('email')) {
                      <p class="text-red-400 text-xs mt-1 ml-1">
                        @if (form.get('email')?.errors?.['required']) { Email is required. }
                        @if (form.get('email')?.errors?.['email']) { Please enter a valid email. }
                      </p>
                    }
                  </div>

                  <!-- Subject -->
                  <div class="relative mb-6">
                    <input
                      id="subject"
                      type="text"
                      formControlName="subject"
                      placeholder="Subject"
                      class="floating-input"
                      [class.border-red-500]="isInvalid('subject')">
                    <label for="subject" class="floating-label">Subject</label>
                    @if (isInvalid('subject')) {
                      <p class="text-red-400 text-xs mt-1 ml-1">Subject is required.</p>
                    }
                  </div>

                  <!-- Message -->
                  <div class="relative mb-6">
                    <textarea
                      id="message"
                      formControlName="message"
                      placeholder="Your Message"
                      rows="5"
                      class="floating-input resize-none"
                      [class.border-red-500]="isInvalid('message')">
                    </textarea>
                    <label for="message" class="floating-label">Your Message</label>
                    @if (isInvalid('message')) {
                      <p class="text-red-400 text-xs mt-1 ml-1">
                        @if (form.get('message')?.errors?.['required']) { Message is required. }
                        @if (form.get('message')?.errors?.['minlength']) { Message must be at least 10 characters. }
                      </p>
                    }
                  </div>

                  <button
                    type="submit"
                    class="btn-primary w-full justify-center text-base py-4"
                    [class.opacity-70]="sending()"
                    [disabled]="sending()">
                    @if (sending()) {
                      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending...
                    } @else {
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                      Send Message
                    }
                  </button>
                </form>
              } @else {
                <!-- Success state -->
                <div class="py-16 text-center space-y-4">
                  <div class="w-20 h-20 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center text-4xl mx-auto">
                    ✅
                  </div>
                  <h3 class="font-display font-bold text-2xl text-white">Message Sent!</h3>
                  <p class="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                  <button (click)="reset()" class="btn-outline mt-4">Send Another</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements AfterViewInit, OnDestroy {
   private platformId = inject(PLATFORM_ID);
   private elRef = inject(ElementRef);
   private scrollSvc = inject(ScrollService);
   private fb = inject(FormBuilder);
   private svc = inject(PortfolioDataService);
   data = this.svc.data;

   submitted = signal(false);
   sending = signal(false);

   form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
   });

   isInvalid(field: string): boolean {
      const ctrl = this.form.get(field);
      return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
   }

   onSubmit(): void {
      this.form.markAllAsTouched();
      if (this.form.invalid) return;
      this.sending.set(true);
      // Simulate async send (replace with real HTTP call)
      setTimeout(() => {
         this.sending.set(false);
         this.submitted.set(true);
      }, 1500);
   }

   reset(): void {
      this.submitted.set(false);
      this.form.reset();
   }

   ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
         const els = this.elRef.nativeElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
         this.scrollSvc.observe(els);
      }
   }
   ngOnDestroy(): void { }
}
