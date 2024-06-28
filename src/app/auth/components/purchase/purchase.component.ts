import { Component, OnInit } from '@angular/core';
import { PurchaseServiceService } from '../../services/purchase-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/ResponseGetAllProducts'
import { ProductServiceService } from '../../services/product-service.service';
import { ResponsePurchaseInfo } from '../../interfaces/ResponsePurchaseInfo';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit{
  products: Product[] = [];
  productId: number | undefined;
  selectedProduct: Product | null = null;
  quantity: number =1;

  constructor(
  private purchaseService: PurchaseServiceService,
  private authService: AuthServiceService,
  private router: Router,
  private productService: ProductServiceService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAvailableProducts().subscribe(
      (
        products: Product[] ) => {
        this.products = products;
      }
      )
  }
  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.productId = product.id;
  }

  onPurchase(): void {
    const userId = this.authService.getUserId();
    if (userId && this.productId){
      this.purchaseService.makePurchase({productId: this.productId, quantity: this.quantity, userId: userId}).subscribe(
        purchaseInfo => {
          console.log("compra realizada: ",purchaseInfo);
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

}
