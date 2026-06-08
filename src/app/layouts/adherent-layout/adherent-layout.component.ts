import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AdherentNavbarComponent } from '../../components/adherent-navbar/adherent-navbar.component';

@Component({
  selector: 'app-adherent-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    AdherentNavbarComponent
  ],
  templateUrl: './adherent-layout.component.html',
  styleUrl: './adherent-layout.component.css',
})
export class AdherentLayoutComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Libellé de la page courante pour le fil d'Ariane (lu depuis route.data.breadcrumb)
  filAriane = signal<string>('');

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        let r = this.route;
        while (r.firstChild) {
          r = r.firstChild;
        }
        this.filAriane.set(r.snapshot.data['breadcrumb'] ?? '');
      });
  }
}
