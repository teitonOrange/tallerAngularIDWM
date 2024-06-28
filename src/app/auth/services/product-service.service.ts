import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/ResponseGetAllProducts';



@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http://localhost:5023/api/auth/products';

  constructor(private http: HttpClient) { }

  getProducts(query: string = ''): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?search=${query}`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/available`);
  }
}
