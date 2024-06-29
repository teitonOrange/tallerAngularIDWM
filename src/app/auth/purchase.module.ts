import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';




@NgModule({
  declarations: [
    // PurchaseComponent,
    ProductComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,



  ]
})
export class PurchaseModule { }
