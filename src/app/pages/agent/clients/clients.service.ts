import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface ApiResponse {
  _id?: string;
  phone?: string;
  addedBy?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = environment.apiUrl;
  private data = '/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${this.apiUrl}${this.data}`);
  }

  createClient(client: {
    phone: string;
  }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}${this.data}`, client);
  }

  updateClient(
    id: string,
    client: { phone: string }
  ): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}${this.data}/${id}`,
      client
    );
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.data}/${id}`);
  }
}
