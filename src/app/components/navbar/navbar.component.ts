// @ts-nocheck
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {
  isMobileMenuOpen: boolean = false;

   
    

  constructor(private router: Router,private soundService: SoundService) {}

  playHoverSound() {
    this.soundService.playSound('/assets/sounds/1.wav');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngAfterViewInit(): void {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute('href')!;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth',
          });

          // Close the mobile menu if open
          this.isMobileMenuOpen = false;
        }
      });
    });
  }
}
