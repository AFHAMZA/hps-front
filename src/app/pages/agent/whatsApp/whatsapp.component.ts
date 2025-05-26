import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { WhatsAppService } from './whatsApp.service';
import { QrCodeComponent } from '../qr-code/qr-code.component';

@Component({
  selector: 'app-whatsapp',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    FooterComponent,
    QrCodeComponent,
  ],
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css'],
})
export class WhatsAppComponent implements OnInit {
  qrCode: string | null = null;
  sessionStatus: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(private whatsappService: WhatsAppService) {}

  ngOnInit(): void {
    this.checkWhatsAppSession();
  }

  checkWhatsAppSession(): void {
    this.whatsappService.startWhatsApp().subscribe(
      (response) => {
        console.log('WhatsApp session check:', response);
        this.qrCode = response.qrCode;
        this.sessionStatus = response.status || 'starting';
        console.log(this.sessionStatus);

        this.errorMessage = null;
      },
      (error) => {
        console.error('Error checking WhatsApp session:', error);
        this.errorMessage =
          error.error?.error || 'Failed to check WhatsApp session';
      }
    );
  }

  startWhatsApp(): void {
    this.loading = true;
    this.whatsappService.startWhatsApp().subscribe(
      (response) => {
        this.qrCode = response.qrCode;
        this.sessionStatus = response.status || 'starting';
        console.log(this.sessionStatus);

        this.errorMessage = null;
        this.successMessage = response.message;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error.error?.error || 'Failed to start WhatsApp';
        this.loading = false;
      }
    );
  }

  restartWhatsApp(): void {
    this.loading = true;
    this.whatsappService.restartWhatsApp().subscribe(
      (response) => {
        console.log('WhatsApp restarted:', response);
        this.qrCode = response.qrCode;
        this.sessionStatus = response.status || 'starting';
        console.log(this.sessionStatus);

        this.errorMessage = null;
        this.successMessage = response.message;
        this.loading = false;
      },
      (error) => {
        console.error('Error restarting WhatsApp:', error);
        this.errorMessage = error.error?.error || 'Failed to restart WhatsApp';
        this.loading = false;
      }
    );
  }

  deleteWhatsApp(): void {
    this.loading = true;
    this.whatsappService.deleteWhatsApp().subscribe(
      (response) => {
        console.log('WhatsApp session deleted:', response);
        this.qrCode = null;
        this.sessionStatus = null;
        console.log(this.sessionStatus);

        this.errorMessage = null;
        this.successMessage = response.message;
        this.loading = false;
      },
      (error) => {
        console.error('Error deleting WhatsApp session:', error);
        this.errorMessage =
          error.error?.error || 'Failed to delete WhatsApp session';
        this.loading = false;
      }
    );
  }
}
