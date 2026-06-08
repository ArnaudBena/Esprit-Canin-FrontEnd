import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Chien } from '../models/chien.model';

@Injectable({
  providedIn: 'root',
})
export class ChienService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/chien`

  getAll(): Observable<Chien[]> {
    return this.http.get<Chien[]>(`${this.apiUrl}/list`);
  }

  /**
   * Recherche serveur avec filtres optionnels (recherche libre + sexe).
   * Le back renvoie la liste déjà triée par nom asc.
   */
  search(filtres: {
    recherche?: string;
    sexe?: string;  // 'MALE' ou 'FEMELLE'
  }): Observable<Chien[]> {
    let params = new HttpParams();
    if (filtres.recherche) params = params.set('recherche', filtres.recherche);
    if (filtres.sexe) params = params.set('sexe', filtres.sexe);
    return this.http.get<Chien[]>(`${this.apiUrl}/search`, { params });
  }

  getById(id: number): Observable<Chien> {
    return this.http.get<Chien>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // --- Espace adhérent ---
  getMesChiens(): Observable<Chien[]> {
    return this.http.get<Chien[]>(`${this.apiUrl}/mes-chiens`);
  }

  getMonChien(id: number): Observable<Chien> {
    return this.http.get<Chien>(`${this.apiUrl}/mes-chiens/${id}`);
  }

  createMonChien(chien: Chien): Observable<Chien> {
    return this.http.post<Chien>(`${this.apiUrl}/mes-chiens`, chien);
  }

  updateMonChien(id: number, chien: Chien): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mes-chiens/${id}`, chien);
  }
}
