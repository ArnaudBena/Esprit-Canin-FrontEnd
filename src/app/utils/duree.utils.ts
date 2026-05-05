/**
 * Formate une durée en minutes en string lisible.
 * Ex : 30 → "30 min" | 60 → "1h" | 90 → "1h30" | 75 → "1h15"
 */
export function dureeAffichage(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
}
