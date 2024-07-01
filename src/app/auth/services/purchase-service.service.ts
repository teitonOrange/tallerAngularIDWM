import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../interfaces/ResponsePurchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {
  private apiUrl = 'http://localhost:5023/api/purchase';

  constructor(private http: HttpClient) { }

  // makePurchase(purchaseData :{ productId: number, quantity: number, UserId}) : Observable<any>{

  makePurchase(purchaseData: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.apiUrl}`, purchaseData);
  }

}
