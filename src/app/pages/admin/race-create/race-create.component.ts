import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RaceService } from '../../../services/race.service';


@Component({
  selector: 'app-race-create',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './race-create.component.html',
  styleUrl: './race-create.component.css',
})
export class RaceCreateComponent {
  private formBuilder = inject(FormBuilder);
  private raceService = inject(RaceService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.raceService.create(this.form.getRawValue()
    ).subscribe({
      next: () =>
        this.router.navigate(['/admin/races']),
      error: (err) => console.error('Erreur de création', err),
    });
  }
}
