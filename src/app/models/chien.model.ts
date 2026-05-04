import { Race } from './race.model';
import { Utilisateur } from './utilisateur.model';

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
}
