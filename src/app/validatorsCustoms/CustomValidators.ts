import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static validBirthday(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; // Si no hay valor, no hay error.
      }

      const birthDate = new Date(value);
      const today = new Date();

      // Asegúrate de que la fecha sea pasada
      if (birthDate >= today) {
        return { invalidBirthday: 'La fecha debe ser anterior a hoy.' };
      }

      // Asegúrate de que el usuario tenga al menos `minAge` años
      const age = today.getFullYear() - birthDate.getFullYear();
      const ageMonth = today.getMonth() - birthDate.getMonth();
      const ageDay = today.getDate() - birthDate.getDate();

      if (age < minAge || (age === minAge && ageMonth < 0) || (age === minAge && ageMonth === 0 && ageDay < 0)) {
        return { invalidBirthday: `El usuario debe tener al menos ${minAge} años.` };
      }

      return null; // No hay errores.
    };
  }
}
