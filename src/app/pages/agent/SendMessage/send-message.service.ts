import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface MessageResponse {
  success: boolean;
  message: string;
  phone?: string;
}

interface BroadcastResponse {
  success: boolean;
  message: string;
  total?: number;
  batchSize?: number;
  intervalMs?: number;
  sentCount?: number;
  failedCount?: number;
  errors?: { phone: string; error: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class SendMessageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sends a single WhatsApp message to a specified phone number.
   * @param phone Phone number with country code (e.g., +123456789).
   * @param message Message content.
   * @returns Observable with the message response.
   */
  sendMessage(phone: string, message: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/messages/messages`, { phone, message }).pipe(
      catchError((error) => {
        console.error('Send message error:', error);
        return throwError(() => new Error(error.error?.error || 'Failed to send message'));
      })
    );
  }

  /**
   * Sends random messages to all or selected clients via WhatsApp in batches.
   * @param messagePool Array of messages to choose from randomly.
   * @param clientIds Optional array of client IDs. If omitted, sends to all clients.
   * @param batchSize Number of messages to send in each batch.
   * @param intervalMs Delay between batches in milliseconds.
   * @returns Observable with broadcast response.
   */
  sendRandomMessages(messagePool: string[], clientIds?: string[], batchSize?: number, intervalMs?: number): Observable<BroadcastResponse> {
    const payload = clientIds && clientIds.length > 0 
      ? { messagePool, clientIds, batchSize, intervalMs }
      : { messagePool, batchSize, intervalMs };
    return this.http.post<BroadcastResponse>(`${this.apiUrl}/messages/broadcast`, payload).pipe(
      catchError((error) => {
        console.error('Broadcast error:', error);
        return throwError(() => new Error(error.error?.error || 'Failed to send broadcast'));
      })
    );
  }
}