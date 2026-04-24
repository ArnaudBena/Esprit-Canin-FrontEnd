import { Component, inject, OnInit, signal } from '@angular/core';
import { Race } from '../../../models/race.model';
import { RaceService } from '../../../services/race.service';
import { DialogService } from '../../../services/dialog.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-race-list',
  imports: [
    RouterLink
  ],
  templateUrl: './race-list.component.html',
  styleUrl: './race-list.component.css',
})
export class RaceListComponent implements OnInit {
  private raceService = inject(RaceService);
  private dialog = inject(DialogService);
  races = signal<Race[]>([]);

  ngOnInit(): void {
    this.raceService.getAll().subscribe({
      next: (data) => this.races.set(data),
      error:(err) => console.log('Erreur de chargement races',err),
    })
  }

  onDelete(race: Race): void {
    this.dialog.confirm({
      titre: 'Supprimer la race',
      message: `Voulez-vous vraiment supprimer la race "${race.nom}" ?`,
      confirmationLabel: 'Supprimer',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.raceService.delete(race.id!).subscribe({
        next: () => {
          this.races.update(list => list.filter(r => r.id !== race.id));
        },
        error: (err) => console.error('Erreur de suppression', err),
      });
    });
  }
}
