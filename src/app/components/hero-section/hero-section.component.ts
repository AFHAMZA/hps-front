import { CommonModule } from '@angular/common';
import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-hero-section',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterLink,

],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {


  constructor(private soundService: SoundService) {}

  

  playHoverSound() {
    this.soundService.playSound('/assets/sounds/1.wav');
  }
}

