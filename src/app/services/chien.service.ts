import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getById(id: number): Observable<Chien> {
    return this.http.get<Chien>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // TODO : create() et update() viendront avec la partie publique (owner connecté)
}
