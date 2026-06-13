import { Race } from './race.model';
import { Utilisateur } from './utilisateur.model';
import { Inscription } from './inscription.model';
import { ChienCompetence } from './chien-competence.model';

export enum Sexe {
  MALE = 'MALE',
  FEMELLE = 'FEMELLE',
}

export interface Chien {
  id?: number;
  nom: string;
  poids: number;
  taille: number;
  sexe: Sexe;
  dateNaissance: string;
  numeroPuce?: string;
  race: Race;
  utilisateur?: Utilisateur;
  inscriptions?: Inscription[];
  chienCompetences?: ChienCompetence[];
}
