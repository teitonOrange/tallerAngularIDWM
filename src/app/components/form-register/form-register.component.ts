import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CloudService } from 'src/app/services/cloud.service';
import { CustomValidators } from 'src/app/validatorsCustoms/CustomValidators';
import { rutValidator } from 'src/app/validatorsCustoms/CutosmRutValidator';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  regiterFrom!: FormGroup;
  options: String[] = ['Masculino','Femenino','Prefiero no decirlo','Otros'];
  selectedOption: String = '';
  selectedOptionIndex: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private CloudService:CloudService,
    private router: Router
  
  ){}
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('Password')?.value;
    const confirmPassword = group.get('ConfirmPassword')?.value;

    // Compara las contraseñas
    return password === confirmPassword ? null : { mismatch: true };
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm()
  {
    this.regiterFrom = this.formBuilder.group({
      Rut: ['',[Validators.required,Validators.pattern(/^\d{7,8}-[0-9kK]$/)]],
      Name: ['',[Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$')]],
      Birthday: ['',[Validators.required,CustomValidators.validBirthday(18),Validators.minLength(8),Validators.maxLength(255)]],
      Email: ['',[Validators.required,Validators.email]],
      GenderId:[null,[Validators.required]],
      Password:['',[Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),Validators.minLength(8),Validators.maxLength(25)]],
      ConfirmPassword:['',[Validators.required]]
    },{
      validators: this.passwordMatchValidator
    });
  }
  onSelectionChange() {
    // Obtener el nombre del género seleccionado
    this.regiterFrom.patchValue({ generId: this.selectedOption });
  }
  
  onSubmit():void
  {
    if(this.regiterFrom.valid)
      {
        const formValue = this.regiterFrom.value;
        this.CloudService.register(formValue).subscribe(
          response=>{
            console.log('registro Exitoso',response);
            this.router.navigateByUrl('');
          },
          error=>{
            console.error('Error en el registro',error);
          }
        )
      }
      else
      {
        this.markFormGroupTouched(this.regiterFrom);
      }
  }
  backToLogin()
  {
    this.router.navigateByUrl("");
  }
  isInvalid(controlName: string): boolean {
    const control = this.regiterFrom.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}
