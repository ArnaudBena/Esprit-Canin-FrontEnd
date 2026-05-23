import { Chien } from './chien.model';
import { StatutPresence } from './statut-presence.model';
import { Seance } from './seance.model';

export interface Inscription {
  chien: Chien;
  seance: Seance;
  dateInscription: string;
  commentaireCoach?: string;
  statutPresence: StatutPresence;
  acquisitionValidee: boolean;
}
