import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { RoleService } from '../../../services/role.service';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-utilisateur-edit-role',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './utilisateur-edit-role.component.html',
  styleUrl: './utilisateur-edit-role.component.css',
})
export class UtilisateurEditRoleComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private utilisateurService = inject(UtilisateurService);
  private roleService = inject(RoleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected id!: number;

  utilisateur = signal<Utilisateur | null>(null);
  roles = signal<Role[]>([]);

  form = this.formBuilder.nonNullable.group({
    roleId: [0, Validators.required],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.utilisateurService.getById(this.id).subscribe({
      next: (utilisateur) => {
        this.utilisateur.set(utilisateur);
        this.form.patchValue({ roleId: utilisateur.role.id });
      },
      error: (err) => console.error('Erreur de chargement utilisateur', err),
    });

    this.roleService.getAll().subscribe({
      next: (roles) => this.roles.set(roles),
      error: (err) => console.error('Erreur de chargement utilisateur', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const utilisateur = this.utilisateur();
    if (!utilisateur) {
      return;
    }

    const nouveauRole = this.roles().find(r => r.id === this.form.controls.roleId.value);
    if(!nouveauRole) {
      return;
    }

    const payload: Utilisateur = {
      ...utilisateur, role:nouveauRole };

    this.utilisateurService.update(this.id, payload).subscribe({
      next: () =>
        this.router.navigate(['/admin/utilisateurs', this.id]),
      error: (err) => console.error('Erreur de modification', err)
    });
  }
}
