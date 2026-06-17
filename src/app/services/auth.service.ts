import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

type JwtInfo = { sub: string; role: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/auth`;

  readonly jwtInfo = signal<JwtInfo | null>(null);

  constructor() {
    this.decodeJwt();
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post(`${this.apiUrl}/connexion`, credentials, { responseType: 'text' })
      .pipe(
        tap((jwt) => {
          localStorage.setItem('jwt', jwt);
          this.decodeJwt();
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.jwtInfo.set(null);
  }

  // URL de l'espace selon le rôle courant (non connecté -> home publique)
  espaceUrl(): string {
    switch (this.jwtInfo()?.role) {
      case 'ADMIN': return '/admin';
      case 'COACH': return '/espace-coach';
      case 'ADHERENT': return '/mon-espace';
      default: return '/';
    }
  }

  private decodeJwt(): void {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    const payloadBase64 = jwt.split('.')[1];
    const payloadJson = atob(payloadBase64);
    this.jwtInfo.set(JSON.parse(payloadJson));
  }

  inscription(payload: {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    password: string;
  }) {
    return this.http.post(`${this.apiUrl}/inscription`, payload);
  }
}
