import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Calendar, Clock, Users } from 'lucide-angular';
import { SeanceService } from '../../../services/seance.service';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { Seance } from '../../../models/seance.model';
import { TypeSeance } from '../../../models/type-seance.model';
import { StatutPresence } from '../../../models/statut-presence.model';
import { dureeAffichage } from '../../../utils/duree.utils';

@Component({
  selector: 'app-mes-seances',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './mes-seances.component.html',
  styleUrl: './mes-seances.component.css',
})
export class MesSeancesComponent implements OnInit {
  private seanceService = inject(SeanceService);
  private typeSeanceService = inject(TypeSeanceService);
  private formBuilder = inject(FormBuilder);

  protected readonly iconCalendar = Calendar;
  protected readonly iconClock = Clock;
  protected readonly iconUsers = Users;
  protected readonly dureeAffichage = dureeAffichage;

  seances = signal<Seance[]>([]);
  types: TypeSeance[] = [];

  filtres = this.formBuilder.nonNullable.group({
    periode: [''],          // '' = tout | 'semaine' | 'mois'
    typeSeanceId: [''],
  });

  ngOnInit(): void {
    this.typeSeanceService.getAll().subscribe({
      next: (data) => this.types = data,
      error: (err) => console.error('Erreur chargement types', err),
    });
    this.charger();
  }

  charger(): void {
    const v = this.filtres.getRawValue();
    this.seanceService.getMesSeances({
      periode: v.periode || undefined,
      typeSeanceId: v.typeSeanceId || undefined,
    }).subscribe({
      next: (data) => this.seances.set(data),
      error: (err) => console.error('Erreur chargement de mes séances', err),
    });
  }

  reinitialiser(): void {
    this.filtres.reset({ periode: '', typeSeanceId: '' });
    this.charger();
  }

  // Inscrits actifs (hors annulés)
  nbInscrits(seance: Seance): number {
    return (seance.inscriptions ?? []).filter((i) => i.statutPresence !== StatutPresence.ANNULEE).length;
  }

  estComplet(seance: Seance): boolean {
    return this.nbInscrits(seance) >= seance.typeSeance.participantsMaximum;
  }
}
