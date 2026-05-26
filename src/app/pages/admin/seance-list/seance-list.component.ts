import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { SeanceService } from '../../../services/seance.service';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { DialogService } from '../../../services/dialog.service';
import { Seance } from '../../../models/seance.model';
import { Utilisateur } from '../../../models/utilisateur.model';
import { TypeSeance } from '../../../models/type-seance.model';
import { StatutSeance } from '../../../models/statut-seance.model';
import { dureeAffichage } from '../../../utils/duree.utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seance-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './seance-list.component.html',
  styleUrl: './seance-list.component.css',
})
export class SeanceListComponent implements OnInit {
  private seanceService = inject(SeanceService);
  private utilisateurService = inject(UtilisateurService);
  private typeSeanceService = inject(TypeSeanceService);
  private dialog = inject(DialogService);

  seances = signal<Seance[]>([]);
  typeSeances = signal<TypeSeance[]>([]);
  coachs = signal<Utilisateur[]>([]);

  // 3 filtres alignés sur la maquette ecran-15
  typeSeanceFiltre = signal<string>('');  // '' ou id du type
  dateFiltre = signal<string>('');         // '' ou yyyy-MM-dd
  coachFiltre = signal<string>('');        // '' ou id du coach

  protected readonly StatutSeance = StatutSeance;
  protected readonly dureeAffichage = dureeAffichage;

  ngOnInit(): void {
    // Charge les dropdowns
    this.typeSeanceService.getAll().subscribe({
      next: (data) => this.typeSeances.set(data),
      error: (err) => console.error('Erreur de chargement types de séance', err),
    });

    this.utilisateurService.getAll().subscribe({
      next: (users) => this.coachs.set(users.filter(u => u.role.nom === 'Coach')),
      error: (err) => console.error('Erreur de chargement utilisateurs', err),
    });

    // Charge la liste initiale (sans filtres)
    this.applyFilters();
  }

  /**
   * Appelle le back avec les filtres courants. Appelé à chaque changement de dropdown.
   */
  applyFilters(): void {
    this.seanceService.search({
      typeSeanceId: this.typeSeanceFiltre() || undefined,
      date: this.dateFiltre() || undefined,
      coachId: this.coachFiltre() || undefined,
    }).subscribe({
      next: (data) => this.seances.set(data),
      error: (err) => console.error('Erreur de recherche', err),
    });
  }

  onAnnuler(seance: Seance): void {
    this.dialog.confirm({
      titre: `Annuler la seance ${seance.typeSeance.libelle} du ${seance.date} ?`,
      message: 'Cette action passera la séance en statut "Annulée". Les inscrits devront être prevenus séparement.',
      confirmationLabel: 'Annuler la séance',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.seanceService.update(seance.id!, { ...seance, statut: StatutSeance.ANNULEE }).subscribe({
        next: () => {
          this.seances.update(list => list.map(s =>
            s.id === seance.id ? { ...s, statut: StatutSeance.ANNULEE } : s
          ));
        },
        error: (err) => console.error('Erreur d\'annulation', err),
      });
    });
  }

  onDelete(seance: Seance): void {
    this.dialog.confirm({
      titre: `Supprimer la seance ${seance.typeSeance.libelle} du ${seance.date} ?`,
      message: "Cette action est définitive. Si la séance a des inscriptions, vous devez d'abord l'annuler et desinscrire les chiens.",
      confirmationLabel: 'Supprimer définitivement',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.seanceService.delete(seance.id!).subscribe({
        next: () => {
          this.seances.update(list => list.filter(s => s.id !== seance.id));
        },
        error: (err) => console.error('Erreur de suppression', err),
      });
    });
  }
}
