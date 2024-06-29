import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';



@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  

})
export class AuthModule { }
