import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Select2Module } from 'ng-select2-component';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { VisionSectionComponent } from '../../components/vision-section/vision-section.component';
import { ProblemSectionComponent } from '../../components/problem-section/problem-section.component';
import { InnovationSectionComponent } from '../../components/innovation-section/innovation-section.component';
import { CrowAircraftSectionComponent } from '../../components/crow-aircraft-section/crow-aircraft-section.component';
import { CallToActionSectionComponent } from '../../components/call-to-action-section/call-to-action-section.component';

declare var $: any;

@Component({
  selector: 'app-presentation',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    Select2Module,
    SlickCarouselModule,
    FooterComponent,
    HeroSectionComponent,
    VisionSectionComponent,
    ProblemSectionComponent,
    InnovationSectionComponent,
    CrowAircraftSectionComponent,
    CallToActionSectionComponent,
  ],

  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css',
})
export class PresentationComponent {
  contactEmail = 'connect@hpsaviation.com';

  currentSlide: number = 0;
  slides: number[] = Array(8).fill(0);
  progressWidth: number = ((this.currentSlide + 1) / this.slides.length) * 100;

  constructor() {
    this.updateProgressBar();
  }

  showSlide(index: number) {
    if (index < 0) index = 0;
    if (index >= this.slides.length) index = this.slides.length - 1;
    this.currentSlide = index;
    this.updateProgressBar();
  }

  previousSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  private updateProgressBar() {
    this.progressWidth = ((this.currentSlide + 1) / this.slides.length) * 100;
  }

  @HostListener('document', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.previousSlide();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchstart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchend(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private touchStartX: number = 0;
  private touchEndX: number = 0;

  private handleSwipe() {
    const swipeThreshold = 50;
    if (this.touchEndX < this.touchStartX - swipeThreshold) {
      // Swipe left
      this.nextSlide();
    } else if (this.touchEndX > this.touchStartX + swipeThreshold) {
      // Swipe right
      this.previousSlide();
    }
  }

  scheduleMeeting() {
    window.alert('mailto:contact@hpsaviation.com?subject=Meeting Request');
  }

  downloadDeck() {
    window.alert('Download link placeholder: https://hpsaviation.com/deck.pdf');
  }
}
