import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ProductServiceService } from '../../services/product-service.service';
import { PurchaseServiceService } from '../../services/purchase-service.service';
import { AuthServiceService } from '../../services/auth-service.service';

import { ResponseGetAllProducts, Product } from '../../interfaces/ResponseGetAllProducts';
import { Purchase } from '../../interfaces/ResponsePurchase';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  private baseUrl = 'http://localhost:5023/api/product';
  products: Product[] = [];
  selectedProduct: Product | null = null;
  quantity: number = 1;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(
    private purchaseService: PurchaseServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductServiceService
  ) { }

  ngOnInit(): void {
    this.loadProducts(this.pageNumber, this.pageSize);
  }

  loadProducts(pageNumber: number, pageSize: number): void {
    this.httpClient.get<any>(`${this.baseUrl}/available/${pageNumber}/${pageSize}`).subscribe(
      (data) => {
        console.log(data); // Imprime la respuesta completa en la consola
        if (data) {
          this.products = data.map((product: Product) => ({ ...product, quantity: 1 }));
        } else {
          console.error("La respuesta no contiene la propiedad 'products'");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Resto del código
}
