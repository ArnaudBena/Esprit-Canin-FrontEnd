import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { AuthNavbarComponent } from '../../components/auth-navbar/auth-navbar.component';

// Validateur de groupe : password === confirmation
function motsDePasseIdentiques(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmation = group.get('confirmation')?.value;
  return password === confirmation ? null : { motsDePasseDifferents: true };
}

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule, RouterLink, AuthNavbarComponent],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group(
    {
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telephone: ['', [Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmation: ['', [Validators.required]],
      rgpd: [false, [Validators.requiredTrue]],
    },
    { validators: motsDePasseIdentiques },
  );

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { prenom, nom, email, telephone, password } = this.form.getRawValue();

    this.authService.inscription({ prenom, nom, email, telephone, password }).subscribe({
      next: () => {
        this.toastService.show('Compte créé ! Vous pouvez vous connecter.', 'success');
        this.router.navigateByUrl('/login');
      },
    });
  }
}
