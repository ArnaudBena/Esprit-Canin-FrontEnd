import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { DialogService } from '../../../services/dialog.service';
import { TypeSeance } from '../../../models/type-seance.model';

@Component({
  selector: 'app-type-seance-list',
  imports: [
    RouterLink
  ],
  templateUrl: './type-seance-list.component.html',
  styleUrl: './type-seance-list.component.css',
})
export class TypeSeanceListComponent implements OnInit {
  private typeSeanceService = inject(TypeSeanceService);
  private dialog = inject(DialogService);
  typeSeances = signal<TypeSeance[]>([]);

  ngOnInit() {
    this.typeSeanceService.getAll().subscribe({
      next: (data) => this.typeSeances.set(data),
      error: (err) => console.log('Erreur de chargement typeSeances', err),
    })
  }

  onDelete(typeSeance: TypeSeance): void {
    this.dialog.confirm({
      titre: 'Supprimer le type de seance',
      message: `Voulez-vous vraiment supprimer le type de seance : "${typeSeance.libelle}"\u00A0?`,
      confirmationLabel: 'Supprimer',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.typeSeanceService.delete(typeSeance.id!).subscribe({
        next: () => {
          this.typeSeances.update(list => list.filter(t => t.id !== typeSeance.id));
        },
        error: (err) => console.log('Erreur de suppression',err),
      });
    });
  }
}
