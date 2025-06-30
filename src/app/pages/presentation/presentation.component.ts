import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Select2Module } from 'ng-select2-component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    Select2Module,
    SlickCarouselModule,
    FooterComponent,
  ],
})
export class PresentationComponent implements OnInit {
  @ViewChild('presentationContent') presentationContent!: ElementRef;
  contactEmail = 'connect@hpsaviation.com';
  currentSlide: number = 0;
  slides: number[] = Array(8).fill(0);
  progressWidth: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.updateProgressBar();
  }

  updateProgressBar(): void {
    this.progressWidth = ((this.currentSlide + 1) / this.slides.length) * 100;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateProgressBar();
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateProgressBar();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateProgressBar();
  }

  downloadAsPdf(): void {
    const element = this.presentationContent.nativeElement;
    const options = {
      margin: 10,
      filename: 'HPS-Aviation-Presentation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf(element, options)
      .set(options)
      .from(element)
      .save();
  }
}
