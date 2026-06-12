import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CoachNavbarComponent } from '../../components/coach-navbar/coach-navbar.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-coach-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    CoachNavbarComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './coach-layout.component.html',
  styleUrl: './coach-layout.component.css',
})
export class CoachLayoutComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Libellé de la page courante pour le fil d'Ariane
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
