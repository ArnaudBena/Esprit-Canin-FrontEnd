import { StatutSeance } from './statut-seance.model';

// Miroir du SeanceCatalogueDto back (vue restreinte : jamais la liste des inscrits)
export interface SeanceCatalogue {
  id: number;
  date: string;
  heureDebut: string;
  dureeMinutes: number;
  statut: StatutSeance;
  typeSeanceId: number;
  typeLibelle: string;
  typeDescription: string;
  ageMinimumMois: number | null;
  ageMaximumMois: number | null;
  coachId: number;
  coachNom: string;
  coachPrenom: string;
  participantsMaximum: number;
  nbInscrits: number;
  // calculés côté back
  placesRestantes: number;
  complet: boolean;
}
