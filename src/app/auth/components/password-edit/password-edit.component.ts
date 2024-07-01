import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent {
  passwordFrom!: FormGroup;

  constructor(private service:AuthServicesService,private router:Router,private fb: FormBuilder){}
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('NewPassword')?.value;
    const confirmPassword = group.get('ConfirmNewPassword')?.value;

    // Compara las contraseñas
    return password === confirmPassword ? null : { mismatch: true };
  }
  ngOnInit(): void {
    
    this.createForm();
  }
  createForm()
  {
    this.passwordFrom = this.fb.group({
      OldPassword: ['',[Validators.required,]],
      NewPassword: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      ConfirmNewPassword: ['',[Validators.required]]
    },{
      Validators:this.passwordMatchValidator
    });
  }
  onSubmit():void
  {
    if(this.passwordFrom.valid)
      {
        const formValue = this.passwordFrom.value;
        this.service.passwordChanger(this.service.getUserId(),formValue,).subscribe(
          Response =>{
            console.log('Actualización exitosa',Response);
            this.router.navigateByUrl('auth/');
          },
          error=>{console.error('Error en la actualización', error);}
        )
      }else
      {
        this.markFormGroupTouched(this.passwordFrom);
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
    const control = this.passwordFrom.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
  backToHome()
  {
    this.router.navigateByUrl('auth/');
  }
}
