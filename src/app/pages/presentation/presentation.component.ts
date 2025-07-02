import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Select2Module } from 'ng-select2-component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

import domtoimage from 'dom-to-image-more';

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
  contactEmail = 'investor@hpsaviation.com';
  currentSlide: number = 0;
  slides: number[] = Array(14).fill(0);
  progressWidth: number = 0;
  isDownloading: boolean = false;

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
    if (!this.presentationContent) return;

    this.isDownloading = true;
    const slides =
      this.presentationContent.nativeElement.querySelectorAll('.slide');
    const pdf = new jsPDF('p', 'mm', 'a4');
    let completedSlides = 0;

    slides.forEach((slide: HTMLElement) => {
      slide.style.opacity = '0';
      slide.style.position = 'absolute';
      slide.style.display = 'none';
      slide.style.width = '100vw';
      slide.style.height = '100vh';
    });

    const processSlide = (index: number) => {
      if (index >= slides.length) {
        slides.forEach((slide: HTMLElement, i: number) => {
          slide.style.opacity = i === this.currentSlide ? '1' : '0';
          slide.style.position = 'absolute';
          slide.style.display = i === this.currentSlide ? 'block' : 'none';
          slide.style.width = '';
          slide.style.height = '';
        });
        pdf.save('HPS-Aviation-Presentation.pdf');
        this.isDownloading = false;
        return;
      }

      const slide = slides[index];
      slide.style.opacity = '1';
      slide.style.position = 'relative';
      slide.style.display = 'block';

      const svgs = slide.querySelectorAll('svg animateTransform');
      svgs.forEach((anim: HTMLElement) => anim.setAttribute('dur', '0s'));

      setTimeout(() => {
        domtoimage
          .toPng(slide, {
            bgcolor: '#0a1929',
            width: slide.offsetWidth * 2,
            height: slide.offsetHeight * 2,
            style: {
              transform: 'scale(2)',
              transformOrigin: 'top left',
            },
            quality: 0.98,
            cacheBust: true,
          })
          .then((dataUrl) => {
            if (index > 0) pdf.addPage();
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(dataUrl, 'PNG', 10, 10, pdfWidth, pdfHeight);

            slide.style.opacity = '0';
            slide.style.position = 'absolute';
            slide.style.display = 'none';

            svgs.forEach((anim: HTMLElement) => anim.removeAttribute('dur'));

            processSlide(index + 1);
          })
          .catch((error) => {
            console.error(`Error processing slide ${index + 1}:`, error);
            this.isDownloading = false;
          });
      }, 200);
    };

    processSlide(0);
  }
}
