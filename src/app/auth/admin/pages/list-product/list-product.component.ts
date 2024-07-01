import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/auth/interfaces/products';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
   products: Products[] =[];
   query:string ='';
  @ViewChild('queryInput') queryInput!: NgForm; 
  constructor(private services: AuthServicesService, private router: Router ){}
  ngOnInit(): void {
    this.loadProducts()
  }
  loadProducts(): void {
    this.services.getProductsAll().subscribe({
      next:(products) =>{
        this.products =products; 
        },
      }
    );
  }
  onSubmit()
  {
    this.searchProduct();
  }
  searchProduct(): void {
    if (!this.query.trim()) {
      return;
    }

    this.services.searchProduct(this.query).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error buscando usuarios:', error);
      }
    });

    // Limpia el valor en la propiedad y resetea el input
    this.query = '';
    this.queryInput.reset();
  }
  backToHome()
  {
    this.router.navigateByUrl('auth/');
  }
  oneDeleteProduct(id:number)
  {
    this.services.deleteProduc(id).subscribe(
      response =>{console.log("producto eliminado correctamente",response);},
      error=>{console.log("Error al eliminar producto", error);}
    )
    this.router.navigateByUrl('auth/edit/admin/product').then(() => {
      window.location.reload();
    });

  }
  updateProduct(id:number)
  {
    this.router.navigate(['auth', 'edit','admin', 'product',id]);
  }
  goToCreateProduct()
  {
    this.router.navigateByUrl('auth/edit/admin/product/add');
  }
}
