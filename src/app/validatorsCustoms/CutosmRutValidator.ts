import { AbstractControl, ValidationErrors } from "@angular/forms";

export class rutValidator{
    static validateRut(control: AbstractControl): ValidationErrors | null {
        const rut = control.value;
        if (!rut) {
          return null; // Si no hay valor, no hay error.
        }
    
        // Formato del RUT: 12345678-9 o 12.345.678-9
        const rutClean = rut.replace(/[.-]/g, '').toUpperCase();
        const rutArray = rutClean.split('-');
        if (rutArray.length !== 2) {
          return { invalidRut: 'Formato de RUT inválido' };
        }
    
        const rutDigits = rutArray[0];
        const rutVerifierDigit = rutArray[1];
        const modulus = 11;
        let sum = 0;
        let multiplier = 2;
    
        // Calcula el dígito verificador
        for (let i = rutDigits.length - 1; i >= 0; i--) {
          sum += Number(rutDigits.charAt(i)) * multiplier;
          multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
        
        const remainder = sum % modulus;
        const verifierDigit = remainder === 0 ? 0 : modulus - remainder;
    
        // Compara el dígito verificador calculado con el ingresado
        if (String(verifierDigit) !== rutVerifierDigit) {
          return { invalidRut: 'RUT inválido' };
        }
    
        return null; // No hay errores.
      }

}