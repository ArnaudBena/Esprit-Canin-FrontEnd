import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';


@Component({
  selector: 'app-role-create',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css',
})
export class RoleCreateComponent {
  private formBuilder = inject(FormBuilder);
  private roleService = inject(RoleService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.roleService.create(this.form.getRawValue()
    ).subscribe({
      next: () =>
        this.router.navigate(['/admin/roles']),
      error: (err) => console.error('Erreur de création', err),
    });
  }
}
