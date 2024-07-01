import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEditComponent } from './auth/components/form-edit/form-edit.component';
import { TableComponent } from './auth/components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { RegisterComponent } from './page/register/register.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    FormComponent,
    AppComponent,
    LoginComponent,
    TableComponent,
    RegisterComponent,
    FormRegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
