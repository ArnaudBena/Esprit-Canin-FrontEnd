import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Vérifie qu'une heure (HH:mm ou HH:mm:ss) est comprise entre min et max inclus.
 * La comparaison se fait en string : "09:00" < "10:30" fonctionne car les heures
 * sont 0-paddées (ordre lexicographique = ordre chronologique).
 */
export function timeRangeValidator(min: string, max: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;
    if (!value) return null;          // pas d'erreur si vide (le required s'en occupe)
    if (value < min || value > max) {
      return { timeOutOfRange: { min, max } };
    }
    return null;
  };
}
