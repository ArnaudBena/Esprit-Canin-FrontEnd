import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { minMaxValidator } from '../../../validators/min-max.validator';
import { TypeSeance } from '../../../models/type-seance.model';

@Component({
  selector: 'app-type-seance-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './type-seance-edit.component.html',
  styleUrl: './type-seance-edit.component.css',
})
export class TypeSeanceEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private typeSeanceService = inject(TypeSeanceService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;

  form = this.formBuilder.group({
    libelle: ['', [Validators.required]],
    description: [''],
    ageMinimumMois: [null as number | null, [Validators.min(0), Validators.max(360)]],
    ageMaximumMois: [null as number | null, [Validators.min(0), Validators.max(360)]],
    dureeMinimale: [null as number | null, [Validators.required, Validators.min(30), Validators.max(240)]],
    dureeMaximale: [null as number | null, [Validators.required, Validators.min(30), Validators.max(240)]],
    participantsMinimum: [null as number | null, [Validators.required, Validators.min(1), Validators.max(10)]],
    participantsMaximum: [null as number | null, [Validators.required, Validators.min(1), Validators.max(10)]],
  }, {
    validators: [
      minMaxValidator('ageMinimum', 'ageMaximum', 'ageIncoherent'),
      minMaxValidator('dureeMinimale', 'dureeMaximale', 'dureeIncoherente'),
      minMaxValidator('participantsMinimum', 'participantsMaximum', 'participantsIncoherents'),
    ]
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.typeSeanceService.getById(this.id).subscribe({
      next: (typeSeance) => this.form.patchValue(typeSeance),
      error: (err)=> console.error('Erreur de chargement', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.typeSeanceService.update(this.id, this.form.getRawValue() as TypeSeance
    ).subscribe({
      next: () =>
        this.router.navigate(['/admin/types-seances']),
      error: (err) => console.error('Erreur de modification', err),
    });
  }
}
