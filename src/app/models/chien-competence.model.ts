import { Competence } from './competence.model';
import { NiveauCompetence } from './niveau-competence.model';

export interface ChienCompetence {
  competence: Competence;
  niveauActuel: NiveauCompetence;
  dateAcquisition: string;
}
