import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  forms!: FormGroup;
  error: boolean =false;
  errorMessages: string[]= [];

  constructor(private formBuilder: FormBuilder, private CloudService: CloudService, private router: Router){}
  
  ngOnInit(): void {
    this.createForm();
  }
  createForm()
  {
    this.forms = this.formBuilder.group({
      Email: ['',[Validators.required,Validators.email]],
      Password: ['',[Validators.required]],
    });
  }
  async onSubmit()
  {

    if(this.forms.invalid)return;
    try
    {
      const response = await this.CloudService.login(this.forms);
      if (response) console.log('Usuario logeado', response);
      else console.log('Usuario no logeado');
      this.error= false;
      this.errorMessages= [];
      console.log('Peticion finalizada');
      this.router.navigateByUrl('auth/home');

    }catch(error:any)
    {
      if(error.status == 0){
          this.error= true;
          this.errorMessages.push('error con la conexion del servidor');
          return;
        }
        console.log('Error en el login',error);
        this.error = true;
        this.errorMessages.push(error.error);
    } finally {
        console.log('Peticion finalizada');
        this.forms.reset();
      }
    }
    get emailInvalid()
    {
      return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
    }

    get passwordInvalid()
    {
      return this.forms.get('password')?.invalid && this.forms.get('password')?.touched;
    }
  goToRegist()
  {
    this.router.navigateByUrl("/register");
  }
    

}
