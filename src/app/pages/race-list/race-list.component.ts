import { Component, inject, OnInit, signal } from '@angular/core';
import { Race } from '../../models/race.model';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'app-race-list',
  imports: [],
  templateUrl: './race-list.component.html',
  styleUrl: './race-list.component.css',
})
export class RaceListComponent implements OnInit {
  private raceService = inject(RaceService);
  races = signal<Race[]>([]);

  ngOnInit(): void {
    this.raceService.getAll().subscribe({
      next: (data) => this.races.set(data),
      error:(err) => console.log('Erreur de chargement races',err),
    })
  }

  onDelete(race: Race): void {
    const confirmed = confirm(`Voulez-vous vraiment supprimer la race "${race.nom}" ?`);
    if (!confirmed) return;

    this.raceService.delete(race.id!).subscribe({
      next: () => {
        this.races.update(list => list.filter(r => r.id !== race.id));
      },
      error: (err) => console.error('Erreur de suppression', err)
    });
  }
}
