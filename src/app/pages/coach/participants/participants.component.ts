import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Calendar, Clock, Check } from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { SeanceService } from '../../../services/seance.service';
import { InscriptionService } from '../../../services/inscription.service';
import { ToastService } from '../../../services/toast.service';
import { Inscription } from '../../../models/inscription.model';
import { StatutPresence } from '../../../models/statut-presence.model';
import { StatutSeance } from '../../../models/statut-seance.model';
import { dureeAffichage } from '../../../utils/duree.utils';

@Component({
  selector: 'app-participants',
  imports: [
    DatePipe,
    LucideAngularModule
  ],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css',
})
export class ParticipantsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seanceService = inject(SeanceService);
  private inscriptionService = inject(InscriptionService);
  private toast = inject(ToastService);

  protected readonly iconCalendar = Calendar;
  protected readonly iconClock = Clock;
  protected readonly iconCheck = Check;
  protected readonly dureeAffichage = dureeAffichage;
  protected readonly StatutPresence = StatutPresence;
  protected readonly StatutSeance = StatutSeance;

  private id!: number;
  inscriptions = signal<Inscription[]>([]);

  // Sélection locale de présence (chienId -> statut) non encore enregistrée
  private presenceLocale = signal<Record<number, StatutPresence>>({});

  // Édition locale du commentaire coach (chienId -> texte) non encore enregistrée
  private commentaireLocal = signal<Record<number, string>>({});

  seance = computed(() => this.inscriptions()[0]?.seance ?? null);

  // Appel possible uniquement sur une séance terminée et non annulée
  appelDisponible = computed(() => {
    const s = this.seance();
    return !!s && s.terminee === true && s.statut !== StatutSeance.ANNULEE;
  });

  // Au moins une présence modifiée et pas encore enregistrée ?
  appelModifie = computed(() =>
    this.inscriptions().some((i) => {
      const choisi = this.presenceLocale()[i.chien.id!];
      return choisi !== undefined && choisi !== i.statutPresence;
    }),
  );

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.seanceService.getParticipants(this.id).subscribe({
      next: (data) =>
        this.inscriptions.set(data.filter((i) => i.statutPresence !== StatutPresence.ANNULEE)),
      error: (err) => console.error('Erreur chargement des participants', err),
    });
  }

  // Présence affichée = sélection locale si présente, sinon valeur enregistrée
  presenceAffichee(inscription: Inscription): StatutPresence {
    return this.presenceLocale()[inscription.chien.id!] ?? inscription.statutPresence;
  }

  // Toggle local : rien n'est envoyé tant qu'on n'enregistre pas l'appel
  choisirPresence(inscription: Inscription, statut: StatutPresence): void {
    this.presenceLocale.update((map) => ({ ...map, [inscription.chien.id!]: statut }));
  }

  enregistrerAppel(): void {
    const map = this.presenceLocale();
    const aEnvoyer = this.inscriptions().filter((i) => {
      const choisi = map[i.chien.id!];
      return choisi !== undefined && choisi !== i.statutPresence;
    });
    if (aEnvoyer.length === 0) return;

    forkJoin(
      aEnvoyer.map((i) => this.inscriptionService.faireAppel(i.chien.id!, this.id, map[i.chien.id!])),
    ).subscribe({
      next: () => {
        // Reporte les sélections locales sur la vérité serveur
        this.inscriptions.update((list) =>
          list.map((i) =>
            map[i.chien.id!] !== undefined ? { ...i, statutPresence: map[i.chien.id!] } : i,
          ),
        );
        this.presenceLocale.set({});
        this.toast.show('Appel enregistré', 'success');
      },
      error: (err) => {
        console.error('Erreur enregistrement appel', err);
        this.toast.show("Impossible d'enregistrer l'appel", 'error');
      },
    });
  }

  validerAcquisition(inscription: Inscription): void {
    this.inscriptionService.validerAcquisition(inscription.chien.id!, this.id).subscribe({
      next: () => {
        this.majInscription(inscription, { acquisitionValidee: true });
        this.toast.show('Acquisition validée', 'success');
      },
      error: (err) => {
        console.error('Erreur acquisition', err);
        this.toast.show("Impossible de valider l'acquisition", 'error');
      },
    });
  }

  // Commentaire affiché = édition locale si présente, sinon valeur enregistrée
  commentaireAffiche(inscription: Inscription): string {
    const local = this.commentaireLocal()[inscription.chien.id!];
    return local !== undefined ? local : (inscription.commentaireCoach ?? '');
  }

  setCommentaire(inscription: Inscription, valeur: string): void {
    this.commentaireLocal.update((map) => ({ ...map, [inscription.chien.id!]: valeur }));
  }

  commentaireModifie(inscription: Inscription): boolean {
    const local = this.commentaireLocal()[inscription.chien.id!];
    return local !== undefined && local !== (inscription.commentaireCoach ?? '');
  }

  enregistrerCommentaire(inscription: Inscription): void {
    const texte = this.commentaireLocal()[inscription.chien.id!] ?? '';
    this.inscriptionService.commenter(inscription.chien.id!, this.id, texte).subscribe({
      next: () => {
        this.majInscription(inscription, { commentaireCoach: texte });
        // la valeur serveur fait foi : on nettoie l'édition locale de ce chien
        this.commentaireLocal.update((map) => {
          const copie = { ...map };
          delete copie[inscription.chien.id!];
          return copie;
        });
        this.toast.show('Commentaire enregistré', 'success');
      },
      error: (err) => {
        console.error('Erreur commentaire', err);
        this.toast.show("Impossible d'enregistrer le commentaire", 'error');
      },
    });
  }

  // Maj locale (les PATCH renvoient 204 sans body)
  private majInscription(cible: Inscription, patch: Partial<Inscription>): void {
    this.inscriptions.update((list) =>
      list.map((i) => (i.chien.id === cible.chien.id ? { ...i, ...patch } : i)),
    );
  }
}
