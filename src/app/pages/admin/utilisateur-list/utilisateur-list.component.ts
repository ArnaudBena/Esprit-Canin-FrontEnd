import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { RoleService } from '../../../services/role.service';
import { Utilisateur } from '../../../models/utilisateur.model';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-utilisateur-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css',
})
export class UtilisateurListComponent {
  private utilisateurService = inject(UtilisateurService);
  private roleService = inject(RoleService);

  utilisateurs = signal<Utilisateur[]>([]);
  roles = signal<Role[]>([]);
  recherche = signal('');
  roleFiltre = signal<string>('');

  /** Liste filtrée par recherche (nom / prénom / email) et par rôle sélectionné. */
  utilisateursFiltres = computed(() => {
    const recherche = this.recherche().trim().toLowerCase();
    const role = this.roleFiltre();
    return this.utilisateurs().filter(utilisateur => {
      const matchRole = !role || utilisateur.role.nom === role;
      const matchQ = !recherche
        || utilisateur.nom.toLowerCase().includes(recherche)
        || utilisateur.prenom.toLowerCase().includes(recherche)
        || utilisateur.email.toLowerCase().includes(recherche);
      return matchRole && matchQ;
    });
  });

  constructor() {
    this.utilisateurService.getAll().subscribe(users => this.utilisateurs.set(users));
    this.roleService.getAll().subscribe(roles => this.roles.set(roles));
  }

  /** Initiales pour l'avatar (ex: "Arnaud Benacquista" → "AB"). */
  initiales(u: Utilisateur): string {
    return ((u.prenom?.[0] ?? '') + (u.nom?.[0] ?? '')).toUpperCase();
  }

  classesBadgeRole(nomRole: string): string {
    switch (nomRole) {
      case 'Admin':
        return 'bg-badge-role-admin-bg text-badge-role-admin-text font-semibold';
      case 'Coach':
        return 'bg-badge-role-coach-bg text-badge-role-coach-text font-semibold';
      case 'Adherent':
        return 'bg-badge-role-proprio-bg text-badge-role-proprio-text font-semibold';
      default:
        return 'bg-fond text-muted font-semibold';
    }
  }

  classesAvatar(nomRole: string): string {
    switch (nomRole) {
      case 'Admin':
        return 'bg-alerte text-texte';
      case 'Coach':
        return 'bg-secondaire text-texte';
      case 'Adherent':
        return 'bg-accent text-accent-text';
      default:
        return 'bg-muted text-blanc';
    }
}
}
