import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private tokenKey: string = "tokenKey";
  private rutAdmin: string = "20416699-4";
  private rut: string = "";
  constructor() { }
  isadmin():boolean
  {
    if(this.rutAdmin === this.rut)
      {
        return true;
      }
      return false;
  }
  
  setToken(token: string): void{
    localStorage.setItem(this.tokenKey,token);
  }
  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  removeToke(): void {
    localStorage.removeItem(this.tokenKey);
  }
  isAuth(): boolean {
    const token = this.getToken();
    return token!==null;
  }
  logout(): void{
    this.removeToke();
  }
  setRut(email: string):void
  {
    localStorage.setItem(this.rut,email);
  }  
}


