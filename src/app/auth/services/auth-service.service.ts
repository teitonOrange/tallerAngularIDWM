import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5023/auth';
  private tokenKey: string = 'tokenKey';


  constructor() { }

  setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void{
    localStorage.removeItem(this.tokenKey);
  }

  isAuth(): boolean{
   const token = this.getToken();
   return token !== null;
  }
  getUserId(): number | null {
    const userId = localStorage.getItem(this.tokenKey);
    return userId ? parseInt(userId) : null;
  }

  logout (): void{
    this.removeToken();
  }
}
