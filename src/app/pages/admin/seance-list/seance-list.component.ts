import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { SeanceService } from '../../../services/seance.service';
import { DialogService } from '../../../services/dialog.service';
import { Seance } from '../../../models/seance.model';
import { Utilisateur } from '../../../models/utilisateur.model';
import { StatutSeance } from '../../../models/statut-seance.model';
import { dureeAffichage } from '../../../utils/duree.utils';
import { RouterLink } from '@angular/router';

type PeriodeFiltre = '' | 'jour' | 'semaine'| 'mois'| 'futures'| 'passees'

@Component({
  selector: 'app-seance-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './seance-list.component.html',
  styleUrl: './seance-list.component.css',
})
export class SeanceListComponent implements OnInit {
  private seanceService = inject(SeanceService);
  private utilisateurService = inject(UtilisateurService);
  private dialog = inject(DialogService);

  seances = signal<Seance[]>([]);
  coachs = signal<Utilisateur[]>([]);
  membres = signal<Utilisateur[]>([]);

  recherche = signal('');
  statutFiltre = signal<string>(''); // Active , annulee , complet ou termine
  periodeFiltre = signal<PeriodeFiltre>(''); // string union plus leger qu'un enum car utilisé uniquement dans ce composant
  coachFiltre = signal<string>(''); // string vide ou id du coach
  membreFiltre = signal<string>(''); // string vide ou id du membre

  protected readonly StatutSeance = StatutSeance;
  protected readonly dureeAffichage = dureeAffichage;

  seancesFiltrees = computed(() => {
    const saisie = this.recherche().trim().toLowerCase();
    const statut = this.statutFiltre();
    const periode = this.periodeFiltre();
    const coachId = this.coachFiltre();
    const membreId = this.membreFiltre();
    const now = new Date();
    now.setHours(0, 0, 0, 0)

    return this.seances().filter(s => {
      // Recherche libre : libelle du type de seance ou le coach nom / prenom ou chiens ou proprios
      if (saisie) {
        const proprios = (s.inscriptions ?? []).map(i => i.chien?.utilisateur);
        const chiens = (s.inscriptions ?? []).map(i => i.chien?.nom?.toLowerCase() ?? '');
        const match =
          s.typeSeance.libelle.toLowerCase().includes(saisie)
          || (s.coach.nom + ' ' + s.coach.prenom).toLowerCase().includes(saisie)
          || chiens.some(n => n.includes(saisie))
          || proprios.some(u =>
            (u?.nom?.toLowerCase().includes(saisie) ?? false)
            || (u?.prenom?.toLowerCase().includes(saisie) ?? false));
        if (!match) return false;
      }

      if (statut) {
        if (statut === 'ACTIVE' && s.statut !== StatutSeance.ACTIVE) return false;
        if (statut === 'ANNULEE' && s.statut !== StatutSeance.ANNULEE) return false;
        if (statut === 'COMPLET' && !s.complet) return false;
        if (statut === 'TERMINEE' && !s.terminee) return false;
      }

      if (periode) {
        const dateSeance = new Date(s.date);
        dateSeance.setHours(0, 0, 0, 0);
        const diffJours = Math.round((dateSeance.getTime() - now.getTime()) / 86400000);
        if (periode === 'jour' && diffJours !== 0) return false;
        if (periode === 'semaine' && (diffJours < 0 || diffJours > 7)) return false;
        if (periode === 'mois' && (diffJours < 0 || diffJours > 30)) return false;
        if (periode === 'futures' && diffJours < 0) return false;
        if (periode === 'passees' && diffJours >= 0) return false;
      }

      if (coachId && String(s.coach.id) !== coachId) return false;

      if (membreId) {
        const trouve = (s.inscriptions ?? []).some(
          i => String(i.chien?.utilisateur?.id) === membreId
        );
        if (!trouve) return false;
      }

      return true;
    }).sort((a, b) => {
      // Tri par date asc, puis par heure asc
      const cmp = a.date.localeCompare(b.date);
      return cmp !== 0 ? cmp : a.heureDebut.localeCompare(b.heureDebut);
    });
  });

  ngOnInit(): void {
    this.seanceService.getAll().subscribe({
      next: (data) => this.seances.set(data),
      error: (err) => console.error('Erreur de chargement des séances', err),
    });

    this.utilisateurService.getAll().subscribe({
      next: (users) => {
        this.coachs.set(users.filter(u => u.role.nom === 'Coach'));
        this.membres.set(users.filter(u => u.role.nom === 'Adherent'));
      },
      error: (err) => console.error('Erreur de chargement utilisateurs', err),
    });
  }

  onAnnuler(seance: Seance): void {
    this.dialog.confirm({
      titre: `Annuler la seance ${seance.typeSeance.libelle} du ${seance.date} ?`,
      message: 'Cette action passera la séance en statut "Annulée". Les inscrits devront être prevenus séparement.', // TODO Feature de mail ou message pour prevenir d'une annulation de séance a tout les utilisateurs incrits
      confirmationLabel: 'Annuler la séance',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.seanceService.update(seance.id!, {...seance, statut: StatutSeance.ANNULEE }).subscribe({
        next: () => {
          this.seances.update(list => list.map(s =>
          s.id === seance.id ? {...s, statut: StatutSeance.ANNULEE} : s
          ));
        },
        error: (err) => console.error('Erreur d\'annulation', err),
      });
    });
  }

  onDelete(seance: Seance): void {
    this.dialog.confirm({
      titre: `Supprimer la seance ${seance.typeSeance.libelle} du ${seance.date} ?`,
      message: "Cette action est définitive. Si la séance a des inscriptions, vous devez d'abord l'annuler et desinscrire les chiens.",
      confirmationLabel: 'Supprimer définitivement',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.seanceService.delete(seance.id!).subscribe({
        next: () => {
          this.seances.update(list => list.filter(s => s.id !== seance.id));
        },
        error: (err) => console.error('Erreur de suppression', err),
      })
    })
  }
}
