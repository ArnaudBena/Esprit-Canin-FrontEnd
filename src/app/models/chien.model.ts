import { Race } from './race.model';

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
}
