import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { SoundService } from '../../services/sound.service';
@Component({
  selector: 'app-call-to-action-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './call-to-action-section.component.html',
  styleUrl: './call-to-action-section.component.css',
})
export class CallToActionSectionComponent implements AfterViewInit {
  email = environment.emailjs.email;
  @ViewChild('contactForm') contactFormRef!: ElementRef<HTMLFormElement>;

  private toastr = inject(ToastrService);

  playHoverSound() {
    this.soundService.playSound('/assets/sounds/1.wav');
  }

  constructor(private soundService: SoundService) {}

  ngAfterViewInit(): void {
    const form = this.contactFormRef.nativeElement;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (form.querySelector('#name') as HTMLInputElement)?.value;
      const email = (form.querySelector('#email') as HTMLInputElement)?.value;
      const message = (form.querySelector('#message') as HTMLTextAreaElement)
        ?.value;
      const title = (form.querySelector('#interest') as HTMLInputElement)?.value;

      if (!name || !email || !message || !title) {
        let missing = [];
        if (!name) missing.push('Name');
        if (!email) missing.push('Email');
        if (!message) missing.push('Message');
        if (!title) missing.push('Interest');

        this.toastr.error(
          `Missing fields: ${missing.join(', ')}`,
          'Missing Data'
        );
        return;
      }

      emailjs
        .sendForm(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          form,
          environment.emailjs.publicKey
        )
        .then(() => {
          this.toastr.success('Message sent successfully!', 'Thank you');
          form.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          this.toastr.error('Sending failed, please try again later.', 'Error');
        });
    });
  }
}
