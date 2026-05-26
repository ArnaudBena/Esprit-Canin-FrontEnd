import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChienService } from '../../../services/chien.service';
import { DialogService } from '../../../services/dialog.service';
import { Chien, Sexe } from '../../../models/chien.model';
import { ageAffichage, ageEnMois } from '../../../utils/age.utils';

@Component({
  selector: 'app-chien-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './chien-list.component.html',
  styleUrl: './chien-list.component.css',
})
export class ChienListComponent implements OnInit {
  private chienService = inject(ChienService);
  private dialog = inject(DialogService);

  chiens = signal<Chien[]>([]);

  // 2 filtres serveur
  recherche = signal('');
  sexeFiltre = signal<string>('');  // '' | 'MALE' | 'FEMELLE'

  protected readonly Sexe = Sexe;
  protected readonly ageAffichage = ageAffichage;
  protected readonly ageEnMois = ageEnMois;

  ngOnInit(): void {
    this.applyFilters();
  }

  /**
   * Appelle le back avec les filtres courants. Appelé à chaque changement de filtre.
   */
  applyFilters(): void {
    this.chienService.search({
      recherche: this.recherche() || undefined,
      sexe: this.sexeFiltre() || undefined,
    }).subscribe({
      next: (data) => this.chiens.set(data),
      error: (err) => console.error('Erreur de recherche chiens', err),
    });
  }

  onDelete(chien: Chien): void {
    this.dialog.confirm({
      titre: `Supprimer ${chien.nom} ?`,
      message: `Cette action est définitive et supprimera aussi ses compétences et inscriptions passées.`,
      confirmationLabel: 'Supprimer définitivement',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.chienService.delete(chien.id!).subscribe({
        next: () => {
          this.chiens.update(list => list.filter(c => c.id !== chien.id));
        },
        error: (err) => console.error('Erreur de suppression', err),
      });
    });
  }
}
