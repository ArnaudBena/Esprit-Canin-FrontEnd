import { Role } from './role.model';

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string; // optionnel : envoyé uniquement au POST de création publique, jamais en édition
  dateInscription?: string; // format ISO yyyy-MM-dd généré côté back par @CreatedDate
  telephone?: string;
  role: Role;
  chiens?: unknown[];   // TODO: remplacer par Chien[] quand le modèle sera créé
}
