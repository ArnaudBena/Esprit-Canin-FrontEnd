import { StatutSeance } from './statut-seance.model';
import { TypeSeance } from './type-seance.model';
import { Utilisateur } from './utilisateur.model';
import { Inscription } from './inscription.model';

export interface Seance {
  id?: number;
  date: string;
  heureDebut: string;
  dureeMinutes: number;
  statut: StatutSeance;
  typeSeance: TypeSeance;
  coach: Utilisateur;
  inscriptions?: Inscription[];

  // Calculés coté back donc ici read-only
  complet?: boolean;
  terminee?: boolean;
}
