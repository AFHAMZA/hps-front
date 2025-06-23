import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  selector: 'app-index',
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

  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {}
