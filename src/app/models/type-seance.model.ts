export interface TypeSeance {
  id?: number;
  libelle: string;
  description?: string;
  ageMinimumMois?: number;
  ageMaximumMois?: number;
  dureeMinimale: number;
  dureeMaximale: number;
  participantsMinimum: number;
  participantsMaximum: number;
}
