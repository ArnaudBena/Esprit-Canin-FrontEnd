import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PawPrint, Calendar, CircleCheck, User } from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { ChienService } from '../../../services/chien.service';
import { InscriptionService } from '../../../services/inscription.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Chien } from '../../../models/chien.model';
import { Inscription } from '../../../models/inscription.model';
import { StatutPresence } from '../../../models/statut-presence.model';
import { ageAffichage, ageEnMois } from '../../../utils/age.utils';

@Component({
  selector: 'app-dashboard-adherent',
  imports: [
    DatePipe,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './dashboard-adherent.component.html',
  styleUrl: './dashboard-adherent.component.css',
})
export class DashboardAdherentComponent implements OnInit {
  private chienService = inject(ChienService);
  private inscriptionService = inject(InscriptionService);
  private utilisateurService = inject(UtilisateurService);

  protected readonly iconChien = PawPrint;
  protected readonly iconCalendar = Calendar;
  protected readonly iconCheck = CircleCheck;
  protected readonly iconUser = User;
  protected readonly ageAffichage = ageAffichage;
  protected readonly ageEnMois = ageEnMois;

  prenom = signal<string>('');
  chiens = signal<Chien[]>([]);
  inscriptions = signal<Inscription[]>([]);

  // Races dont l'image a échoué → on retombe sur l'icône patte
  protected readonly racesSansImage = signal(new Set<string>());

  onImageError(nomRace: string): void {
    this.racesSansImage.update((set) => new Set(set).add(nomRace));
  }

  ngOnInit(): void {
    forkJoin({
      profil: this.utilisateurService.getProfil(),
      chiens: this.chienService.getMesChiens(),
      inscriptions: this.inscriptionService.getMesInscriptions(),
    }).subscribe({
      next: ({ profil, chiens, inscriptions }) => {
        this.prenom.set(profil.prenom);
        this.chiens.set(chiens);
        this.inscriptions.set(inscriptions);
      },
      error: (err) => console.error('Erreur de chargement du dashboard', err),
    });
  }

  // À venir : séance non terminée + pas annulée, triées par date croissante
  prochaines(): Inscription[] {
    return this.inscriptions()
      .filter((i) => !i.seance.terminee && i.statutPresence !== StatutPresence.ANNULEE)
      .sort((a, b) => a.seance.date.localeCompare(b.seance.date));
  }

  // Passées : séance terminée
  passees(): Inscription[] {
    return this.inscriptions().filter((i) => i.seance.terminee);
  }

  // Aperçu dashboard : les 3 prochaines (le reste se voit sur le catalogue / la fiche chien)
  prochainesApercu(): Inscription[] {
    return this.prochaines().slice(0, 3);
  }

  // Nb de séances réalisées (passées) pour un chien donné
  nbSeancesRealisees(chienId: number): number {
    return this.passees().filter((i) => i.chien.id === chienId).length;
  }
}
