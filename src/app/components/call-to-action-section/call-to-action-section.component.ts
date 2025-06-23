import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-to-action-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './call-to-action-section.component.html',
  styleUrl: './call-to-action-section.component.css',
})
export class CallToActionSectionComponent implements AfterViewInit {
  email = 'investors@hpsaviation.com';

  @ViewChild('contactForm') contactFormRef!: ElementRef<HTMLFormElement>;

  ngAfterViewInit(): void {
    const form = this.contactFormRef.nativeElement;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (form.querySelector('#name') as HTMLInputElement)?.value;
      const email = (form.querySelector('#email') as HTMLInputElement)?.value;
      const interest = (form.querySelector('#interest') as HTMLSelectElement)
        ?.value;
      const message = (form.querySelector('#message') as HTMLTextAreaElement)
        ?.value;

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      alert('Thank you for your interest! Our team will contact you shortly.');

      form.reset();
    });
  }
}
