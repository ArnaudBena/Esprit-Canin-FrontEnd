import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css',
})
export class RoleEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private roleService = inject(RoleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;

  form = this.formBuilder.nonNullable.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.roleService.getById(this.id).subscribe({
      next: (role) => this.form.patchValue(role),
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.roleService.update(this.id, this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/admin/roles']),
      error: (err) => console.error('Erreur de modification', err)
    })
  }
}
