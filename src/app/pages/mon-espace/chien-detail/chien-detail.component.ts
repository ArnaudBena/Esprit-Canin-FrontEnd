import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule, PawPrint } from 'lucide-angular';
import { ChienService } from '../../../services/chien.service';
import { DialogService } from '../../../services/dialog.service';
import { Chien } from '../../../models/chien.model';
import { Inscription } from '../../../models/inscription.model';
import { StatutPresence } from '../../../models/statut-presence.model';
import { ageAffichage, ageEnMois } from '../../../utils/age.utils';
import { InscriptionService } from '../../../services/inscription.service';

@Component({
  selector: 'app-chien-detail',
  imports: [
    DatePipe,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './chien-detail.component.html',
  styleUrl: './chien-detail.component.css',
})
export class ChienDetailComponent implements OnInit {
  private chienService = inject(ChienService);
  private dialog = inject(DialogService);
  private inscriptionService = inject(InscriptionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected id!: number;
  protected readonly iconPatte = PawPrint;
  protected readonly ageAffichage = ageAffichage;
  protected readonly ageEnMois = ageEnMois;

  chien = signal<Chien | null>(null);

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.charger();
  }

  private charger(): void {
    this.chienService.getMonChien(this.id).subscribe({
      next: (chien) => this.chien.set(chien),
      error: (err) => console.error('Erreur de chargement', err),
    });
  }

  // Inscriptions actives dont la séance n'est pas encore terminée
  seancesAVenir(): Inscription[] {
    return (this.chien()?.inscriptions ?? [])
      .filter((i) => !i.seance.terminee && i.statutPresence !== StatutPresence.ANNULEE)
      .sort((a, b) => a.seance.date.localeCompare(b.seance.date));
  }

  // Séances terminées (plus récentes en premier)
  historique(): Inscription[] {
    return (this.chien()?.inscriptions ?? [])
      .filter((i) => i.seance.terminee)
      .sort((a, b) => b.seance.date.localeCompare(a.seance.date));
  }

  onSupprimer(): void {
    const chien = this.chien();
    if (!chien) return;

    this.dialog.confirm({
      titre: `Supprimer ${chien.nom} ?`,
      message: 'Cette action est définitive. Un chien ayant déjà des séances (passées ou à venir) ne peut pas être supprimé.',
      confirmationLabel: 'Supprimer',
      danger: true,
    }).subscribe((confirme) => {
      if (!confirme) return;

      this.chienService.deleteMonChien(this.id).subscribe({
        next: () => this.router.navigate(['/mon-espace/mes-chiens']),
        // 409 (chien avec inscriptions) → toast automatique via errorInterceptor
        error: (err) => console.error('Suppression impossible', err),
      });
    });
  }

  onDesinscrire(insc: Inscription): void {
    const chien = this.chien();
    if (!chien) return;

    this.dialog.confirm({
      titre: 'Se désinscrire de cette séance ?',
      message: `${chien.nom} sera désinscrit de « ${insc.seance.typeSeance.libelle} ». La place sera libérée pour un autre adhérent.`,
      confirmationLabel: 'Se désinscrire',
      danger: true,
    }).subscribe((confirme) => {
      if (!confirme) return;

      this.inscriptionService.annulerMonInscription(this.id, insc.seance.id!).subscribe({
        next: () => this.charger(),
        // 409 (séance passée)
        error: (err) => console.error('Désinscription impossible', err),
      });
    });
  }
}
