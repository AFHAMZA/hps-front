import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-vision-section',
  imports: [
    CommonModule,
    RouterLink,

],
  templateUrl: './vision-section.component.html',
  styleUrl: './vision-section.component.css'
})
export class VisionSectionComponent {

  
    constructor(private soundService: SoundService) {}
  
    playHoverSound() {
      this.soundService.playSound('/assets/sounds/1.wav');
    }

}
