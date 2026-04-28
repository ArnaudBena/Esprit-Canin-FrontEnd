import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TypeSeance } from '../models/type-seance.model';



@Injectable({
  providedIn: 'root',
})
export class TypeSeanceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/typeSeance`;

  getAll(): Observable<TypeSeance[]> {
    return this.http.get<TypeSeance[]>(`${this.apiUrl}/list`);
  }

  getById(id: number): Observable<TypeSeance> {
    return this.http.get<TypeSeance>(`${this.apiUrl}/${id}`);
  }

  create(typeSeance :TypeSeance): Observable<TypeSeance> {
    return this.http.post<TypeSeance>(this.apiUrl, typeSeance);
  }

  update(id: number, typeSeance: TypeSeance): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, typeSeance);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
