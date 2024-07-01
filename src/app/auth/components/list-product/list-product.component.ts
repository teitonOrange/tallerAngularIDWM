import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ProductServiceService } from '../../services/product-service.service';
import { PurchaseServiceService } from '../../services/purchase-service.service';
import { AuthServiceService } from '../../services/auth-service.service';

import { ResponseGetAllProducts, Product } from '../../interfaces/ResponseGetAllProducts';
import { Purchase } from '../../interfaces/ResponsePurchase';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent  implements OnInit{
  private baseUrl = 'http://localhost:5023/api/product';
  products: Product[] = [];
  showModal=false;
  selectedProduct: Product | null = null;
  quantity: number = 1;
  pageNumber: number = 1;
  pageSize: number = 10;
  purchaseForm: FormGroup;

  constructor(
    private purchaseService: PurchaseServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductServiceService,
    private formBuilder: FormBuilder
  ) { this.purchaseForm =  this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  confirmPurchase(): void {
    if (this.purchaseForm.valid){
      const quantity = this.purchaseForm.value.quantity;
      if (this.selectedProduct) {
        const userId = 29;
        console.log(`Comprar ${quantity} unidades de ${this.selectedProduct.name}`);
        console.log(userId);
        const purchaseDto : Purchase = { productId: this.selectedProduct.id, quantity,userId};
        //usar el Puchase que equivale al PuschaseDto en el backend


        if(quantity < this.selectedProduct.stock){
          this.purchaseService.makePurchase(purchaseDto).subscribe(
            (data) => {
              console.log(data);
              this.loadProducts(this.pageNumber, this.pageSize);
            },
            (error) => {
              console.error(error);
            }
          );
        }
        console.log(purchaseDto);
      }
      this.closeModal();
   }

  }




  ngOnInit(): void {
    this.loadProducts(this.pageNumber, this.pageSize);
  }

  loadProducts(pageNumber: number, pageSize: number): void {
    this.httpClient.get<ResponseGetAllProducts>(`${this.baseUrl}/available/${pageNumber}/${pageSize}`).subscribe(
      (data) => {
        console.log(data); // Imprime la respuesta completa en la consola
        if (data) {
          if (data && data.products) {
            this.products = data.products.map((product: Product) => ({ ...product, quantity: 1 }));
          } else {
            console.error("La respuesta no contiene la propiedad 'products'");
          }
        } else {
          console.error("La respuesta no contiene la propiedad 'products'");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }




}
