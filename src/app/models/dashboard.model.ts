import { Seance } from './seance.model';

/**
 * Miroir en TS du DashboardDTO coté back.
 * Reçu en une seule requête GET /admin/dashboard.
 * Tous les champs sont read-only, les calculs sont coté back.
 */
export interface Dashboard {
  totalUtilisateurs: number;
  nouveauxUtilisateursCeMois: number;
  totalChiens: number;
  seancesCeMois: number;
  seancesMoisDernier: number;
  tauxRemplissageMoyen: number;
  prochainesSeances: Seance[];
}
