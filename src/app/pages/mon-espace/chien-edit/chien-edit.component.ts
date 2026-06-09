import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChienService } from '../../../services/chien.service';
import { RaceService } from '../../../services/race.service';
import { Race } from '../../../models/race.model';
import { Chien, Sexe } from '../../../models/chien.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-chien-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './chien-edit.component.html',
  styleUrl: './chien-edit.component.css',
})
export class ChienEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private chienService = inject(ChienService);
  private raceService = inject(RaceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected id!: number;
  races: Race[] = [];
  protected today = new Date().toISOString().split('T')[0];

  chien = signal<Chien | null>(null);

  form = this.formBuilder.nonNullable.group({
    nom: ['', [Validators.required, Validators.maxLength(50)]],
    raceId: [null as number | null, [Validators.required]],
    dateNaissance: ['', [Validators.required]],
    poids: [null as number | null, [Validators.required, Validators.min(0.1)]],
    taille: [null as number | null, [Validators.required, Validators.min(0.1)]],
    sexe: ['MALE', [Validators.required]],
    numeroPuce: ['', [Validators.maxLength(30)]],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      races: this.raceService.getAll(),
      chien: this.chienService.getMonChien(this.id),
    }).subscribe({
      next: ({ races, chien }) => {
        this.races = races;
        this.chien.set(chien);
        this.form.patchValue({
          nom: chien.nom,
          raceId: chien.race.id ?? null,
          dateNaissance: chien.dateNaissance,
          poids: chien.poids,
          taille: chien.taille,
          sexe: chien.sexe,
          numeroPuce: chien.numeroPuce ?? '',
        });
      },
      error: (err) => console.error('Erreur de chargement', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const chienCourant = this.chien();
    if (!chienCourant) return;

    const v = this.form.getRawValue();
    const chien: Chien = {
      ...chienCourant,
      nom: v.nom,
      poids: v.poids!,
      taille: v.taille!,
      sexe: v.sexe as Sexe,
      dateNaissance: v.dateNaissance,
      numeroPuce: v.numeroPuce || undefined,
      race: { id: v.raceId! } as Race,
    };

    this.chienService.updateMonChien(this.id, chien).subscribe({
      next: () => this.router.navigate(['/mon-espace/mes-chiens']),
      error: (err) => console.error('Erreur de modification', err),
    });
  }
}
