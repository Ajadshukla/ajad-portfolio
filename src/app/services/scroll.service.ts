import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
   private platformId = inject(PLATFORM_ID);
   private observer?: IntersectionObserver;

   observe(elements: NodeListOf<Element> | Element[]): void {
      if (!isPlatformBrowser(this.platformId)) return;

      this.observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
               }
            });
         },
         { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );

      elements.forEach((el) => this.observer!.observe(el));
   }

   scrollTo(sectionId: string): void {
      if (!isPlatformBrowser(this.platformId)) return;
      const el = document.getElementById(sectionId);
      if (el) {
         el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   }

   disconnect(): void {
      this.observer?.disconnect();
   }
}
