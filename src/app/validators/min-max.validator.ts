import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Vérifie que la valeur du champ `minKey` est <= à celle de `maxKey`.
 * Utilisable comme validator au niveau d'un FormGroup.
 *
 * @param minKey nom du contrôle "minimum"
 * @param maxKey nom du contrôle "maximum"
 * @param errorKey clé de l'erreur retournée (pour l'affichage HTML)
 */
export function minMaxValidator(minKey: string, maxKey: string, errorKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const min = group.get(minKey)?.value;
    const max = group.get(maxKey)?.value;
    if (min != null && max != null && min > max) {
      return { [errorKey]: true };
    }
    return null;
  };
}
