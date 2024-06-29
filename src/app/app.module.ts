import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PurchaseComponent } from './auth/components/purchase/purchase.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductServiceService } from './auth/services/product-service.service';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './auth/components/product/product.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    //login
    //formulario
    PurchaseComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
