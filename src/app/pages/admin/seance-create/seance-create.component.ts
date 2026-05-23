import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SeanceService } from '../../../services/seance.service';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { TypeSeance } from '../../../models/type-seance.model';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Seance } from '../../../models/seance.model';
import { StatutSeance } from '../../../models/statut-seance.model';

@Component({
  selector: 'app-seance-create',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './seance-create.component.html',
  styleUrl: './seance-create.component.css',
})
export class SeanceCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private seanceService = inject(SeanceService);
  private typeSeanceService = inject(TypeSeanceService);
  private utilisateurService = inject(UtilisateurService);
  private router = inject(Router);

  typeSeances: TypeSeance[] = [];
  coachs: Utilisateur[] = [];

  form = this.formBuilder.nonNullable.group({
    date: ['', [Validators.required]],
    heureDebut: ['', [Validators.required]],
    dureeMinutes: [null as number | null, [Validators.required, Validators.min(1)]],
    typeSeanceId: [null as number | null, [Validators.required]],
    coachId: [null as number | null, [Validators.required]],
  });

  ngOnInit(): void {
    this.typeSeanceService.getAll().subscribe({
      next: (data) => this.typeSeances = data,
      error: (err) => console.error('Erreur chargement types de séances', err),
    });

    this.utilisateurService.getAll().subscribe({
      next: (users) => this.coachs = users.filter(u => u.role.nom === 'Coach'),
      error: (err) => console.error('Erreur chargement coachs', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    // Le back attend HH:mm:ss, l'input HTML <input type="time"> renvoie HH:mm
    const heureDebut = v.heureDebut.length === 5 ? `${v.heureDebut}:00` : v.heureDebut;

    const seance: Seance = {
      date: v.date,
      heureDebut,
      dureeMinutes: v.dureeMinutes!,
      statut: StatutSeance.ACTIVE,
      typeSeance: { id: v.typeSeanceId! } as TypeSeance,
      coach: { id: v.coachId! } as Utilisateur,
    };

    this.seanceService.create(seance).subscribe({
      next: () => this.router.navigate(['/admin/seances']),
      error: (err) => console.error('Erreur de création', err),
    });
  }
}
