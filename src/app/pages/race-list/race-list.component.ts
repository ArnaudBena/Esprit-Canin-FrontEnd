import { Component, inject, OnInit } from '@angular/core';
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
  races: Race[] = [];

  ngOnInit(): void {
    this.raceService.getAll().subscribe({
      next: (data) => this.races = data,
      error:(err) => console.log('Erreur de chargement races',err),
    })
  }
}
