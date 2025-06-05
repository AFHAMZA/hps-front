import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SendMessageService } from './send-message.service';
import { ClientsService } from '../clients/clients.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { COUNTRY_CODES, CountryCode } from '../clients/country-codes';

interface ClientData {
  _id: string;
  phone: string;
  addedBy: string;
  createdAt: string;
}

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    FooterComponent,
  ],
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css'],
})
export class SendMessageComponent implements OnInit {
  sendMessageForm: FormGroup;
  broadcastForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSendingMessage = false;
  isSendingBroadcast = false;
  countryCodes: CountryCode[] = COUNTRY_CODES;
  clients: ClientData[] = [];
  activeTab: 'single' | 'broadcast' = 'single';
  totalClients: number = 0;
  currentPage: number = 1;
  pageSize: number = 100; 
  totalPages: number = 0;

  constructor(
    private sendMessageService: SendMessageService,
    private clientsService: ClientsService,
    private fb: FormBuilder
  ) {
    this.sendMessageForm = this.fb.group({
      inputType: ['manual', [Validators.required]],
      countryCode: ['+20', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      clientId: [''],
      message: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.broadcastForm = this.fb.group({
      messagePool: ['', [Validators.required, Validators.minLength(1)]],
      clientIds: [[]],
      batchSize: [10, [Validators.required, Validators.min(1)]],
      intervalMs: [5000, [Validators.required, Validators.min(1000)]],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.setupSendMessageFormListeners();
  }

  loadClients(): void {
    this.clientsService.getClients(this.currentPage, this.pageSize).subscribe(
      (data: { clients: ClientData[]; total: number }) => {
        this.clients = data.clients || [];
        this.totalClients = data.total; 
        this.totalPages = Math.ceil(this.totalClients / this.pageSize);
        console.log('Clients fetched:', this.clients);
      },
      (error) => {
        console.error('Error fetching clients:', error);
        this.errorMessage = 'Failed to load clients';
      }
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadClients();
    }
  }

  setupSendMessageFormListeners(): void {
    this.sendMessageForm.get('inputType')?.valueChanges.subscribe((value) => {
      if (value === 'manual') {
        this.sendMessageForm.get('countryCode')?.setValidators([Validators.required]);
        this.sendMessageForm.get('phone')?.setValidators([Validators.required, Validators.pattern(/^\d{10,15}$/)]);
        this.sendMessageForm.get('clientId')?.clearValidators();
      } else {
        this.sendMessageForm.get('countryCode')?.clearValidators();
        this.sendMessageForm.get('phone')?.clearValidators();
        this.sendMessageForm.get('clientId')?.setValidators([Validators.required]);
      }
      this.sendMessageForm.get('countryCode')?.updateValueAndValidity();
      this.sendMessageForm.get('phone')?.updateValueAndValidity();
      this.sendMessageForm.get('clientId')?.updateValueAndValidity();
    });

    this.sendMessageForm.get('clientId')?.valueChanges.subscribe((clientId) => {
      if (clientId) {
        const client = this.clients.find((c) => c._id === clientId);
        if (client) {
          const phone = client.phone;
          const countryCode = this.countryCodes.find((code) => phone.startsWith(code.code))?.code || '+20';
          const phoneNumber = phone.replace(countryCode, '');
          this.sendMessageForm.patchValue({
            countryCode,
            phone: phoneNumber,
          });
        }
      }
    });
  }

  setActiveTab(tab: 'single' | 'broadcast'): void {
    this.activeTab = tab;
    this.errorMessage = null;
    this.successMessage = null;
  }

  sendMessage(): void {
    if (this.sendMessageForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    this.isSendingMessage = true;
    this.errorMessage = null;
    this.successMessage = null;

    const { inputType, countryCode, phone, clientId, message } = this.sendMessageForm.value;
    let fullPhone: string;

    if (inputType === 'manual') {
      fullPhone = `${countryCode}${phone}`;
    } else {
      const client = this.clients.find((c) => c._id === clientId);
      fullPhone = client?.phone || '';
    }

    this.sendMessageService.sendMessage(fullPhone, message).subscribe({
      next: (response) => {
        console.log('Message sent:', response);
        this.sendMessageForm.reset({ inputType: 'manual', countryCode: '+20' });
        this.successMessage = response.message || 'Message sent successfully';
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.errorMessage = error.message || 'Failed to send message';
      },
      complete: () => {
        this.isSendingMessage = false;
      },
    });
  }

  sendBroadcast(): void {
    if (this.broadcastForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    this.isSendingBroadcast = true;
    this.errorMessage = null;
    this.successMessage = null;

    const { messagePool, clientIds, batchSize, intervalMs } = this.broadcastForm.value;
    const messages = messagePool
      .split('\n')
      .map((msg: string) => msg.trim())
      .filter((msg: string) => msg);

    if (messages.length === 0) {
      this.errorMessage = 'Please enter at least one valid message';
      this.isSendingBroadcast = false;
      return;
    }

    this.sendMessageService.sendRandomMessages(messages, clientIds.length > 0 ? clientIds : undefined, batchSize, intervalMs).subscribe({
      next: (response) => {
        console.log('Broadcast initiated:', response);
        this.broadcastForm.reset({ messagePool: '', clientIds: [], batchSize: 10, intervalMs: 5000 });
        this.successMessage = `${response.message}. Total clients: ${response.total}, Batch size: ${response.batchSize}, Interval: ${response.intervalMs}ms`;
      },
      error: (error) => {
        console.error('Error initiating broadcast:', error);
        this.errorMessage = error.message || 'Failed to initiate broadcast';
      },
      complete: () => {
        this.isSendingBroadcast = false;
      },
    });
  }
}