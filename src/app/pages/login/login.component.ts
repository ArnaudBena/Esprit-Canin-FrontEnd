import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { AuthNavbarComponent } from '../../components/auth-navbar/auth-navbar.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule, AuthNavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  motDePasseVisible = signal(false);
  readonly iconEye = Eye;
  readonly iconEyeOff = EyeOff;

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.toastService.show('Connexion réussie', 'success');
        const role = this.authService.jwtInfo()?.role;
        this.router.navigateByUrl(role === 'ADMIN' ? '/admin' : '/mon-espace');
      },
      error: () => this.toastService.show('Email ou mot de passe incorrect', 'error'),
    });
  }
}
