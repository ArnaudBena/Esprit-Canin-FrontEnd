import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  recherche = signal('');
  sexeFiltre = signal<string>('');

  protected readonly Sexe = Sexe;
  protected readonly ageAffichage = ageAffichage;
  protected readonly ageEnMois = ageEnMois;

  // Liste filtrée par recherche (nom du chien, nom/prénom du propriétaire) et par sexe.
  chiensFiltres = computed(() => {
    const termeRecherche = this.recherche().trim().toLowerCase();
    const sexe = this.sexeFiltre();
    return this.chiens().filter(chien => {
      const matchSexe = !sexe || chien.sexe === sexe;
      const proprio = chien.utilisateur;
      const matchTermeRecherche = !termeRecherche
        || chien.nom.toLowerCase().includes(termeRecherche)
        || chien.race.nom.toLowerCase().includes(termeRecherche)
        || (proprio?.nom.toLowerCase().includes(termeRecherche) ?? false)
        || (proprio?.prenom.toLowerCase().includes(termeRecherche) ?? false);
      return matchSexe && matchTermeRecherche;
    });
  });

  ngOnInit(): void {
    this.chienService.getAll().subscribe({
      next: (chiens) => this.chiens.set(chiens),
      error: (err) => console.error('Erreur de chargement chiens', err),
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
        error:(err) => console.error('Erreur de suppression', err),
      });
    });
  }
}
