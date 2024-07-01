import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ProductServiceService } from '../../services/product-service.service';
import { PurchaseServiceService } from '../../services/purchase-service.service';
import { AuthServiceService } from '../../services/auth-service.service';

import { ResponseGetAllProducts, Product } from '../../interfaces/ResponseGetAllProducts';
import { Purchase } from '../../interfaces/ResponsePurchase';
import { ListProductComponent } from '../../components/list-product/list-product.component';

@Component({
  selector: 'app-purchase',//colocar esto en listPAge.html
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent  {


}
