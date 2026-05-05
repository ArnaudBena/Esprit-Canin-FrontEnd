/**
 * Formate un nombre de mois en string lisible.
 * Ex : 0 → "Moins d'un mois" | 5 → "5 mois" | 12 → "1 an" | 25 → "2 ans"
 */
export function ageAffichage(mois: number): string {
  if (mois < 1)  return 'Moins d\'un mois';
  if (mois < 12) return `${mois} mois`;
  const ans = Math.floor(mois / 12);
  return `${ans} an${ans > 1 ? 's' : ''}`;
}

/**
 * Calcule l'âge en mois à partir d'une date de naissance ISO (ex: "2022-05-12").
 */
export function ageEnMois(dateNaissance: string): number {
  const naissance = new Date(dateNaissance);
  const maintenant = new Date();
  const mois = (maintenant.getFullYear() - naissance.getFullYear()) * 12
    + (maintenant.getMonth() - naissance.getMonth())
    - (maintenant.getDate() < naissance.getDate() ? 1 : 0);
  return Math.max(0, mois);
}
