import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeanceService } from '../../../services/seance.service';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { DialogService } from '../../../services/dialog.service';
import { TypeSeance } from '../../../models/type-seance.model';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Seance } from '../../../models/seance.model';
import { Inscription } from '../../../models/inscription.model';
import { StatutSeance } from '../../../models/statut-seance.model';
import { forkJoin } from 'rxjs';
import { timeRangeValidator } from '../../../validators/time-range.validator';

@Component({
  selector: 'app-seance-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './seance-edit.component.html',
  styleUrl: './seance-edit.component.css',
})
export class SeanceEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private seanceService = inject(SeanceService);
  private typeSeanceService = inject(TypeSeanceService);
  private utilisateurService = inject(UtilisateurService);
  private dialog = inject(DialogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected id!: number;
  protected readonly StatutSeance = StatutSeance;

  typeSeances: TypeSeance[] = [];
  coachs: Utilisateur[] = [];

  // Signal pour réafficher dynamiquement les bonnes infos (statut, inscrits)
  seance = signal<Seance | null>(null);

  form = this.formBuilder.nonNullable.group({
    date: ['', [Validators.required]],
    heureDebut: ['', [Validators.required, timeRangeValidator('09:00', '19:00')]],
    dureeMinutes: [null as number | null, [Validators.required, Validators.min(1)]],
    typeSeanceId: [null as number | null, [Validators.required]],
    coachId: [null as number | null, [Validators.required]],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      typeSeances: this.typeSeanceService.getAll(),
      users: this.utilisateurService.getAll(),
      seance: this.seanceService.getById(this.id),
    }).subscribe({
      next: ({ typeSeances, users, seance }) => {
        this.typeSeances = typeSeances;
        this.coachs = users.filter(u => u.role.nom === 'Coach');
        this.seance.set(seance);
        this.form.patchValue({
          date: seance.date,
          heureDebut: seance.heureDebut.substring(0, 5),
          dureeMinutes: seance.dureeMinutes,
          typeSeanceId: seance.typeSeance.id ?? null,
          coachId: seance.coach.id ?? null,
        });
      },
      error: (err) => console.error('Erreur de chargement', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const seanceCourante = this.seance();
    if (!seanceCourante) return;

    const v = this.form.getRawValue();
    const heureDebut = v.heureDebut.length === 5 ? `${v.heureDebut}:00` : v.heureDebut;

    const seance: Seance = {
      ...seanceCourante,
      date: v.date,
      heureDebut,
      dureeMinutes: v.dureeMinutes!,
      typeSeance: { id: v.typeSeanceId! } as TypeSeance,
      coach: { id: v.coachId! } as Utilisateur,
    };

    this.seanceService.update(this.id, seance).subscribe({
      next: () => this.router.navigate(['/admin/seances']),
      error: (err) => console.error('Erreur de modification', err),
    });
  }

  onAnnuler(): void {
    const seance = this.seance();
    if (!seance) return;

    this.dialog.confirm({
      titre: `Annuler la séance ${seance.typeSeance.libelle} du ${seance.date} ?`,
      message: 'Cette action passera la séance en statut "Annulée". Les inscrits devront être prévenus séparément.',
      confirmationLabel: 'Annuler la séance',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.seanceService.update(this.id, { ...seance, statut: StatutSeance.ANNULEE }).subscribe({
        next: () => {
          this.seance.update(s => s ? { ...s, statut: StatutSeance.ANNULEE } : s);
        },
        error: (err) => console.error('Erreur d\'annulation', err),
      });
    });
  }

  onDesinscrire(inscription: Inscription): void {
    // TODO : à brancher quand on aura un inscription.service côté front (phase 2)
    console.log('Désinscription à venir', inscription);
  }
}
