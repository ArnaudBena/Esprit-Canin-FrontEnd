import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Race } from '../../model/race';
import { RaceService } from '../../services/race/race';
import { FormsModule } from '@angular/forms';
import { Observable, single } from 'rxjs';


@Component({
  selector: 'app-testAdminRace',
  imports: [FormsModule],
  templateUrl: './adminRace.html',
  styleUrl: './adminRace.css',
})
export class AdminRace implements OnInit {

  http = inject(HttpClient);
  raceService = inject(RaceService);
  listRace = signal<Race[]>([])
  modalOuverte = signal(false);
  modalAjoutOuverte = signal(false);
  modalSuppressionOuvert = signal(false);
  raceSelectionnee = signal<Race | null>(null);
  nouvelleRace = signal<Partial<Race>>({});
  idASupprimer = signal<number | null>(null);

  ngOnInit() {

    this.http
      .get<Race[]>("http://localhost:8080/race/list")
      .subscribe(listeRace => this.listRace.set(listeRace));
  }

  ouvrirModal(race: Race): void {
    this.raceSelectionnee.set({ ...race });
    this.modalOuverte.set(true);
  }

  ouvrirModalAjout(): void {
    this.nouvelleRace.set({});
    this.modalAjoutOuverte.set(true);
  }

  ouvrirModalSuppression(id : number): void {
    this.idASupprimer.set(id);
    this.modalSuppressionOuvert.set(true)
  }

  fermerModal(): void {
    this.raceSelectionnee.set(null)
    this.modalOuverte.set(false)
  }

  fermerModalAjout(): void {
    this.nouvelleRace.set({});
    this.modalAjoutOuverte.set(false);
  }

  fermerModalSuppression(): void {
    this.idASupprimer.set(null);
    this.modalSuppressionOuvert.set(false)
  }


  onUpdate(): void {
    const race = this.raceSelectionnee();
    if (!race) return;
    this.raceService.updateRace(race.id, race).subscribe({
      next : () => {
        this.listRace.update(list => list.map(r => r.id === race.id ? race : r));
        this.fermerModal();
      },
      error: (err) => console.error(err)
    })
  }

  onCreate(): void {
    const race = this.nouvelleRace();
    if (!race.nom) return;
    this.raceService.createRace(race as Race).subscribe({
      next : (raceCree) => {
        this.listRace.update(list => [...list, raceCree]);
        this.fermerModalAjout();
      },
      error: (err) => console.error(err)
    })
  }

  onDelete(): void {
    const id = this.idASupprimer();
    if (!id) return;
    this.raceService.deleteRace(id).subscribe({
      next : () => {
        this.listRace.update(list => list.filter(r => r.id !== id));
        this.fermerModalSuppression();
      },
      error: (err) => console.error(err)
    });
  }
}
