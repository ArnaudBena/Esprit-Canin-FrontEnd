import { Race } from './race.model';
import { Utilisateur } from './utilisateur.model';
import { Inscription } from './inscription.model';

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
}
