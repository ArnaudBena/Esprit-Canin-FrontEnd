import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { minMaxValidator } from '../../../validators/min-max.validator';
import { TypeSeance } from '../../../models/type-seance.model';

@Component({
  selector: 'app-type-seance-create',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './type-seance-create.component.html',
  styleUrl: './type-seance-create.component.css',
})
export class TypeSeanceCreateComponent {
  private formBuilder = inject(FormBuilder);
  private typeSeanceService = inject(TypeSeanceService);
  private router = inject(Router);

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
      minMaxValidator('ageMinimumMois', 'ageMaximumMois', 'ageIncoherent'),
      minMaxValidator('dureeMinimale', 'dureeMaximale', 'dureeIncoherente'),
      minMaxValidator('participantsMinimum', 'participantsMaximum', 'participantsIncoherents'),
    ]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.typeSeanceService.create(this.form.getRawValue() as TypeSeance
    ).subscribe({
      next: () =>
        this.router.navigate(['/admin/types-seances']),
      error: (err) => console.error('Erreur de création', err),
    });
  }
}
