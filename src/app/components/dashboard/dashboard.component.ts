import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';
import { dureeAffichage } from '../../utils/duree.utils';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  protected readonly dureeAffichage = dureeAffichage;

  dashboard = signal<Dashboard | null>(null);

  // Différence d'utilisateurs : "+X ce mois" le back nous donne déjà le nb brut
  // Delta séances : signé pour pouvoir afficher "+3" ou "-2" vs le mois dernier
  deltaSeances = computed(() => {
    const d = this.dashboard();
    if (!d) return 0;
    return d.seancesCeMois - d.seancesMoisDernier;
  });

  ngOnInit():void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => this.dashboard.set(data),
      error: (err) => console.error('Erreur de chargement du dashboard', err),
    });
  }
}
