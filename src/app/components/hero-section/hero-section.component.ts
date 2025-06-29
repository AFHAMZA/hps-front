import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-hero-section',
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

