import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Calendar, Clock, User, Check } from 'lucide-angular';
import { SeanceService } from '../../../services/seance.service';
import { ChienService } from '../../../services/chien.service';
import { InscriptionService } from '../../../services/inscription.service';
import { SeanceCatalogue } from '../../../models/seance-catalogue.model';
import { Prerequis } from '../../../models/prerequis.model';
import { Chien } from '../../../models/chien.model';
import { dureeAffichage } from '../../../utils/duree.utils';

@Component({
  selector: 'app-seance-detail',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './seance-detail.component.html',
  styleUrl: './seance-detail.component.css',
})
export class SeanceDetailComponent implements OnInit {
  private seanceService = inject(SeanceService);
  private chienService = inject(ChienService);
  private inscriptionService = inject(InscriptionService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  protected id!: number;
  protected readonly iconCalendar = Calendar;
  protected readonly iconClock = Clock;
  protected readonly iconCoach = User;
  protected readonly iconCheck = Check;
  protected readonly dureeAffichage = dureeAffichage;

  seance = signal<SeanceCatalogue | null>(null);
  prerequis = signal<Prerequis[]>([]);
  mesChiens = signal<Chien[]>([]);
  confirmation = signal<{ seance: string; date: string; chien: string } | null>(null);

  form = this.formBuilder.nonNullable.group({
    chienId: [null as number | null, [Validators.required]],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.seanceService.getCatalogueDetail(this.id).subscribe({
      next: (s) => this.seance.set(s),
      error: (err) => console.error('Erreur chargement séance', err),
    });
    this.seanceService.getPrerequis(this.id).subscribe({
      next: (data) => this.prerequis.set(data),
      error: (err) => console.error('Erreur chargement prérequis', err),
    });
    this.chienService.getMesChiens().subscribe({
      next: (data) => this.mesChiens.set(data),
      error: (err) => console.error('Erreur chargement chiens', err),
    });
  }

  niveauLabel(n: string): string {
    const labels: Record<string, string> = {
      DEBUTANT: 'Débutant',
      INTERMEDIAIRE: 'Intermédiaire',
      CONFIRME: 'Confirmé',
    };
    return labels[n] ?? n;
  }

  onInscrire(): void {
    if (this.form.invalid) return;
    const seance = this.seance();
    if (!seance) return;

    const chienId = this.form.getRawValue().chienId!;
    this.inscriptionService.inscrireMonChien(chienId, this.id).subscribe({
      next: () => {
        const chien = this.mesChiens().find((c) => c.id === chienId);
        this.confirmation.set({
          seance: seance.typeLibelle,
          date: seance.date,
          chien: chien ? `${chien.nom} (${chien.race.nom})` : '',
        });
      },
      error: (err) => console.error('Inscription impossible', err),
    });
  }
}
