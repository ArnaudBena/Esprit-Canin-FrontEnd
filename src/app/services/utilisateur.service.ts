import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';


@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/utilisateur`;

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/list`);
  }

  /**
   * Recherche serveur avec filtres optionnels (recherche libre + rôle).
   * Le back renvoie la liste déjà triée par nom asc + prénom asc.
   */
  search(filtres: {
    recherche?: string;
    roleId?: string;
  }): Observable<Utilisateur[]> {
    let params = new HttpParams();
    if (filtres.recherche) params = params.set('recherche', filtres.recherche);
    if (filtres.roleId) params = params.set('roleId', filtres.roleId);
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/search`, { params });
  }

  getById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  update(id: number, utilisateur: Utilisateur): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, utilisateur);
  }

  updatePassword(id: number, password: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/password`, { password });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ----- Espace adhérent : mon profil (identité déduite du JWT côté back) -----

  getProfil(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/profil`);
  }

  updateProfil(profil: Utilisateur): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/profil`, profil);
  }

  updateMonPassword(ancienPassword: string, nouveauPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/profil/password`, { ancienPassword, nouveauPassword });
  }

  deleteMonCompte(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/profil`);
  }
}
