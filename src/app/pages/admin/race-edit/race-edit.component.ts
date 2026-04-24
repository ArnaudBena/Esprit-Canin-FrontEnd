import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RaceService } from '../../../services/race.service';

@Component({
  selector: 'app-race-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './race-edit.component.html',
  styleUrl: './race-edit.component.css',
})
export class RaceEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private raceService = inject(RaceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;

  form = this.formBuilder.nonNullable.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.raceService.getById(this.id).subscribe({
      next: (race) => this.form.patchValue(race),
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.raceService.update(this.id, this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/admin/races']),
      error: (err) => console.error('Erreur de modification', err)
    })
  }
}
