import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/ResponseGetAllProducts';
import { Purchase } from '../interfaces/ResponsePurchase';



@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http://localhost:5023/api/product';

  constructor(private http: HttpClient) { }

  getProducts(query: string = ''): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?search=${query}`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getAvailableProducts(pageNumber:number, pageSize:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/available/{pageNumber/{pageSize}}`);
  }
  purchaseProduct(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase`, {productId, quantity});
  }
}
