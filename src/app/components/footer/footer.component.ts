import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';
@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  playHoverSound() {
    this.soundService.playSound('/assets/sounds/1.wav');
  }
  constructor(private soundService: SoundService) {}

}
