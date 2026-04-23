import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/race`

  getAll(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.apiUrl}/list`);
  }

  getById(id: number): Observable<Race> {
    return this.http.get<Race>(`${this.apiUrl}/${id}`);
  }

  create(race :Race): Observable<Race> {
    return this.http.post<Race>(this.apiUrl, race);
  }

  update(id: number, race: Race): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, race);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
