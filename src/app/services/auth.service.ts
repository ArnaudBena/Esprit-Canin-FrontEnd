import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

// Contenu utile qu'on trouve dans le JWT du back :
//   sub  = email (setSubject côté AuthController)
//   role = "ADMIN" | "COACH" | "ADHERENT"  (getNom().toUpperCase())
type JwtInfo = { sub: string; role: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/auth`;

  // signal = état réactif lisible partout (navbar, guards) sans Observable
  readonly jwtInfo = signal<JwtInfo | null>(null);

  constructor() {
    // au démarrage de l'app, on relit le token déjà stocké (refresh page)
    this.decodeJwt();
  }

  login(credentials: { email: string; password: string }) {
    // Le back renvoie le JWT en TEXTE BRUT (pas du JSON) => responseType: 'text'
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

  // URL de l'espace selon le rôle courant (non connecté → home publique)
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
    // un JWT = 3 parties séparées par "." : header.payload.signature
    // on décode SEULEMENT le payload (partie [1]) pour lire sub + role
    const payloadBase64 = jwt.split('.')[1];
    const payloadJson = atob(payloadBase64); // base64 -> texte
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
