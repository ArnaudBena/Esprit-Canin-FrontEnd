import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur.model';

@Component({
  selector: 'app-utilisateur-detail',
  imports: [
    CommonModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './utilisateur-detail.component.html',
  styleUrl: './utilisateur-detail.component.css',
})
export class UtilisateurDetailComponent implements OnInit {

  private service = inject(UtilisateurService);
  private route = inject(ActivatedRoute);

  utilisateur = signal<Utilisateur | null>(null);
  chargement = signal(true);

  ngOnInit(): void {
    const id =
      Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.service.getById(id).subscribe({
        next: utilisateur => {
          this.utilisateur.set(utilisateur)
          this.chargement.set(false);
        },
        error: () => this.chargement.set(false),
      });
    } else {
      this.chargement.set(false);
    }
  }

  initiales(utilisateur: Utilisateur): string {
    return ((utilisateur.prenom?.[0] ?? '') + (utilisateur.nom?.[0] ?? '')).toUpperCase();
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
