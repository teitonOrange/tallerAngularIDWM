import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    // PurchaseComponent,
    ProductComponent,
    ListProductComponent,
    PurchaseComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule




  ]
})
export class PurchaseModule { }
