import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Inscription } from '../models/inscription.model';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/inscription`;

  inscrireMonChien(chienId: number, seanceId: number): Observable<Inscription> {
    return this.http.post<Inscription>(`${this.apiUrl}/mes-inscriptions`, { chienId, seanceId });
  }

  getMesInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/mes-inscriptions`);
  }
}
