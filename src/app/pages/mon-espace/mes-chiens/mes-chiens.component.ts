import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PawPrint } from 'lucide-angular';
import { ChienService } from '../../../services/chien.service';
import { Chien } from '../../../models/chien.model';
import { ageAffichage, ageEnMois } from '../../../utils/age.utils';
import { StatutPresence } from '../../../models/statut-presence.model';

@Component({
  selector: 'app-mes-chiens',
  imports:
    [
      RouterLink,
      LucideAngularModule
    ],
  templateUrl: './mes-chiens.component.html',
  styleUrl: './mes-chiens.component.css',
})
export class MesChiensComponent implements OnInit {
  private chienService = inject(ChienService);

  chiens = signal<Chien[]>([]);
  readonly iconPatte = PawPrint;
  protected readonly ageAffichage = ageAffichage;
  protected readonly ageEnMois = ageEnMois;

  ngOnInit(): void {
    this.chienService.getMesChiens().subscribe({
      next: (data) => this.chiens.set(data),
      error: (err) => console.error('Erreur chargement mes chiens', err),
    });
  }

  nbSeancesRealisees(chien: Chien): number {
    return (chien.inscriptions ?? []).filter(
      (i) => i.statutPresence === StatutPresence.PRESENT,
    ).length;
  }
}
