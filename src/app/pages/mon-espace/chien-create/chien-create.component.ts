import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChienService } from '../../../services/chien.service';
import { RaceService } from '../../../services/race.service';
import { Race } from '../../../models/race.model';
import { Chien, Sexe } from '../../../models/chien.model';

@Component({
  selector: 'app-chien-create',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './chien-create.component.html',
  styleUrl: './chien-create.component.css',
})
export class ChienCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private chienService = inject(ChienService);
  private raceService = inject(RaceService);
  private router = inject(Router);

  races: Race[] = [];
  protected today = new Date().toISOString().split('T')[0];

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
    this.raceService.getAll().subscribe({
      next: (data) => this.races = data,
      error: (err) => console.error('Erreur chargement races', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    const chien: Chien = {
      nom: v.nom,
      poids: v.poids!,
      taille: v.taille!,
      sexe: v.sexe as Sexe,
      dateNaissance: v.dateNaissance,
      numeroPuce: v.numeroPuce || undefined,
      race: { id: v.raceId! } as Race,
    };

    this.chienService.createMonChien(chien).subscribe({
      next: () => this.router.navigate(['/mon-espace/mes-chiens']),
      error: (err) => console.error('Erreur de création', err),
    });
  }
}
