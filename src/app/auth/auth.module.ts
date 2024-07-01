import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PerfilEditComponent } from './pages/perfil-edit/perfil-edit.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordChangerComponent } from './pages/password-changer/password-changer.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';
import { ListProductComponent } from './admin/pages/list-product/list-product.component';
import { FormsCrudComponent } from './admin/forms/forms-crud/forms-crud.component';
import { FormsRegisterProductComponent } from './admin/forms/forms-register-product/forms-register-product.component';
import { EditProductComponent } from './admin/pages/edit-product/edit-product.component';
import { CreateProductComponent } from './admin/pages/create-product/create-product.component';
import { ListUserComponent } from './admin/pages/list-user/list-user.component';



@NgModule({
  declarations: [
    HomepageComponent,
    PerfilEditComponent,
    FormEditComponent,
    PasswordChangerComponent,
    PasswordEditComponent,
    ListProductComponent,
    FormsCrudComponent,
    FormsRegisterProductComponent,
    EditProductComponent,
    CreateProductComponent,
    ListUserComponent,
    ListProductComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],



})
export class AuthModule { }
