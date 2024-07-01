import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PurchaseModule } from './purchase.module';
import { ListProductComponent } from './components/list-product/list-product.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomepageComponent, ListProductComponent, PurchaseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PurchaseModule,
    ReactiveFormsModule
  ],


})
export class AuthModule { }
