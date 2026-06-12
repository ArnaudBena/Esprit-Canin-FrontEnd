import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PawPrint } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  private auth = inject(AuthService);
  protected readonly iconPatte = PawPrint;

  // Accueil contextuel selon le rôle (comme la redirection du login), sinon home publique
  accueilLien(): string {
    switch (this.auth.jwtInfo()?.role) {
      case 'ADMIN': return '/admin';
      case 'COACH': return '/espace-coach';
      case 'ADHERENT': return '/mon-espace';
      default: return '/';
    }
  }
}
