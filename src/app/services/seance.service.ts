import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Seance } from '../models/seance.model';

@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/seance`;

  getAll(): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.apiUrl}/list`);
  }

  /**
   * Recherche serveur avec filtres optionnels (typeSeance, date, coach).
   * Le back renvoie la liste déjà triée par date asc + heure asc.
   */
  search(filtres: {
    typeSeanceId?: string;
    date?: string;
    coachId?: string;
  }): Observable<Seance[]> {
    let params = new HttpParams();
    if (filtres.typeSeanceId) params = params.set('typeSeanceId', filtres.typeSeanceId);
    if (filtres.date) params = params.set('date', filtres.date);
    if (filtres.coachId) params = params.set('coachId', filtres.coachId);
    return this.http.get<Seance[]>(`${this.apiUrl}/search`, { params });
  }

  getById(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${this.apiUrl}/${id}`);
  }

  create(seance: Seance): Observable<Seance> {
    return this.http.post<Seance>(this.apiUrl, seance);
  }

  update(id: number, seance: Seance): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, seance);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
