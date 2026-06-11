import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { Utilisateur } from '../../../models/utilisateur.model';
import { DialogService } from '../../../services/dialog.service';

// Validateur de groupe : nouveauPassword === confirmation
function motsDePasseIdentiques(group: AbstractControl): ValidationErrors | null {
  const nouveau = group.get('nouveauPassword')?.value;
  const confirmation = group.get('confirmation')?.value;
  return nouveau === confirmation ? null : { motsDePasseDifferents: true };
}

@Component({
  selector: 'app-mon-profil',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './mon-profil.component.html',
  styleUrl: './mon-profil.component.css',
})
export class MonProfilComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private utilisateurService = inject(UtilisateurService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private dialog = inject(DialogService);
  // L'admin n'est pas supprimable (back = 403) → on masque la carte RGPD pour lui
  protected readonly estAdmin = this.authService.jwtInfo()?.role === 'ADMIN';

  profil = signal<Utilisateur | null>(null);
  enEdition = signal(false);

  changementMdp = signal(false);

  passwordForm = this.formBuilder.nonNullable.group(
    {
      ancienPassword: ['', [Validators.required]],
      nouveauPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmation: ['', [Validators.required]],
    },
    { validators: motsDePasseIdentiques },
  );

  form = this.formBuilder.nonNullable.group({
    prenom: ['', [Validators.required, Validators.maxLength(50)]],
    nom: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    telephone: ['', [Validators.maxLength(20)]],
  });

  ngOnInit(): void {
    this.utilisateurService.getProfil().subscribe({
      next: (profil) => this.profil.set(profil),
      error: (err) => console.error('Erreur de chargement', err),
    });
  }

  ouvrirEdition(): void {
    const p = this.profil();
    if (!p) return;
    this.form.patchValue({
      prenom: p.prenom,
      nom: p.nom,
      email: p.email,
      telephone: p.telephone ?? '',
    });
    this.enEdition.set(true);
  }

  annuler(): void {
    this.enEdition.set(false);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const existant = this.profil();
    if (!existant) return;

    const v = this.form.getRawValue();
    const emailModifie = v.email !== existant.email;

    const profil: Utilisateur = {
      ...existant,
      prenom: v.prenom,
      nom: v.nom,
      email: v.email,
      telephone: v.telephone || undefined,
    };

    this.utilisateurService.updateProfil(profil).subscribe({
      next: () => {
        // Changer l'email invalide le JWT actuel (sub = ancien email) → reconnexion forcée
        if (emailModifie) {
          this.authService.logout();
          this.toastService.show('Email modifié, reconnecte-toi avec la nouvelle adresse.', 'success');
          this.router.navigateByUrl('/login');
          return;
        }
        this.profil.set(profil);
        this.enEdition.set(false);
        this.toastService.show('Profil mis à jour', 'success');
      },
      // 409 (email déjà utilisé)
      error: (err) => console.error('Erreur de mise à jour', err),
    });
  }

  ouvrirChangementMdp(): void {
    this.passwordForm.reset();
    this.changementMdp.set(true);
  }

  annulerChangementMdp(): void {
    this.changementMdp.set(false);
  }

  onChangerMotDePasse(): void {
    if (this.passwordForm.invalid) return;

    const { ancienPassword, nouveauPassword } = this.passwordForm.getRawValue();

    this.utilisateurService.updateMonPassword(ancienPassword, nouveauPassword).subscribe({
      next: () => {
        // Changement de mdp = on force la reconnexion (choix sécurité, cohérent avec l'email)
        this.authService.logout();
        this.toastService.show('Mot de passe modifié, reconnecte-toi.', 'success');
        this.router.navigateByUrl('/login');
      },
      // 400 (ancien mdp incorrect / trop court)
      error: (err) => console.error('Erreur de changement de mot de passe', err),
    });
  }

  onSupprimerCompte(): void {
    this.dialog.confirm({
      titre: 'Supprimer mon compte ?',
      message: 'Cette action est irréversible et supprimera toutes tes données.',
      confirmationLabel: 'Supprimer',
      danger: true,
    }).subscribe((confirme) => {
      if (!confirme) return;

      this.utilisateurService.deleteMonCompte().subscribe({
        next: () => {
          this.authService.logout();
          this.toastService.show('Ton compte a été supprimé.', 'success');
          this.router.navigateByUrl('/');
        },
        // 403 (admin) / 409 (coach avec séances)
        error: (err) => console.error('Suppression impossible', err),
      });
    });
  }
}
