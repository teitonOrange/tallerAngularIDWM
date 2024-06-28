import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {
  private apiUrl = 'http://localhost:5023/purchase';

  constructor(private http: HttpClient) { }

  makePurchase(purchaseData :{ productId: number, quantity: number, userId: number }) : Observable<any>{
    return this.http.post(this.apiUrl, purchaseData);
  }

}
