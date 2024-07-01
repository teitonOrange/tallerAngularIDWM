import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/validatorsCustoms/CustomValidators';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent {
  editForm!:FormGroup;
  generd: string[] = ['Masculino', 'Femenino','Prefiero no decirlo','Otros']
  selectedOption: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private services:AuthServicesService,
    private router: Router
   ){}
   ngOnInit(): void {
    
    this.createForm();
  }
  createForm()
  {
    this.editForm=this.formBuilder.group({
      Name:['',[Validators.minLength(8),Validators.maxLength(255)]],
      Birthday: ['',[CustomValidators.validBirthday(18)]],
      GenderId: ['']
    })
  }
  onSelectionChange()
  {
    this.editForm.patchValue({GenderId: this.selectedOption})
  }
  onSubmit():void
  {
    if(this.editForm.valid)
      {
        const formValue = this.editForm.value;
        this.services.editUser(this.services.getUserId(),formValue,).subscribe(
          Response =>{
            console.log('Actualización exitosa',Response);
            this.router.navigateByUrl('auth/');
          },
          error=>{console.error('Error en la actualización', error);}
        )
      }else
      {
        this.markFormGroupTouched(this.editForm);
      }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  isInvalid(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
  backToHome()
  {
    this.router.navigateByUrl('auth/');
  }
  
}
