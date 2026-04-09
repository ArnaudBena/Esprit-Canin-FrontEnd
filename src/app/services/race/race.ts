import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../../model/race';

@Injectable({
  providedIn: 'root',
})
export class RaceService {

  private apiUrl = 'http://localhost:8080/race';

  constructor(private http: HttpClient) {}

  updateRace(id: number, race: Race): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, race)
  }

  createRace(race: Race): Observable<Race> {
    return this.http.post<Race>(this.apiUrl, race)
  }

  deleteRace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
