import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Inscription } from '../models/inscription.model';
import { StatutPresence } from '../models/statut-presence.model';

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

  annulerMonInscription(chienId: number, seanceId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/mes-inscriptions/${chienId}/${seanceId}/annuler`, {});
  }

  faireAppel(chienId: number, seanceId: number, statutPresence: StatutPresence): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${chienId}/${seanceId}/presence`, { statutPresence });
  }

  validerAcquisition(chienId: number, seanceId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${chienId}/${seanceId}/acquisition`, {});
  }

  commenter(chienId: number, seanceId: number, commentaire: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${chienId}/${seanceId}/commentaire`, { commentaire });
  }
}
