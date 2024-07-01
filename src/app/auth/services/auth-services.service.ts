import { Injectable } from '@angular/core';
import { EditUser } from '../interfaces/edit-user';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PasswordChanger } from '../interfaces/password-changer';
import { ProductType, Products } from '../interfaces/products';
import { ProductUpdate } from '../interfaces/product-update';
import { Users } from '../interfaces/users';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private readonly urlAuth: string = "http://localhost:5023/api/"
  private readonly tokenKey: string = "tokenKey";
  private readonly idKeyRol: string ="roleId";
  private readonly idUser:string= 'userId';
  private readonly nameUser:string='Name';
  
  constructor(private http: HttpClient) { }

  editUser(id:number,userEdit:EditUser):Observable<string>
  {
    const endpoint = `${this.urlAuth}User/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.put(endpoint, userEdit, { headers, responseType: 'text' });
  }
  
  passwordChanger(id:number,password:PasswordChanger):Observable<string>
  {
    const endpoint= `${this.urlAuth}User/${id}/password`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.put(endpoint,password,{headers,responseType:'text'});
  }
  getProductsAll():Observable<Products[]>
  {
    const endpoint = `${this.urlAuth}Product`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.get<Products[]>(endpoint,{headers});
  }
  deleteProduc(id:number): Observable<string>
  {
    const endpoint= `${this.urlAuth}Product/${id}`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.delete<string>(endpoint,{headers});
  }
  editProduct(id:number,productUpdate:FormData):Observable<{message:string}>
  {
    const endpoint=`${this.urlAuth}Product/${id}`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.put<{message:string}>(endpoint,productUpdate,{headers,responseType: 'text' as 'json' });
  }
  getTypesProducts():Observable<ProductType[]>
  {
    const endpoint=`${this.urlAuth}Product/types`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.get<ProductType[]>(endpoint,{headers});
  }
  createProduct(createProduct:FormData):Observable<string>
  {
    const endpoint=`${this.urlAuth}Product`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.post<string>(endpoint,createProduct,{headers});
  }
  getUserAll():Observable<Users[]>
  {
    const endpoint = `${this.urlAuth}User`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.get<Users[]>(endpoint,{headers});
  }
  changeUserState(userId: number, newState: string): Observable<string> {
    const url = `${this.urlAuth}/User/${userId}/state`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.put<string>(url, newState, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error al cambiar el estado del usuario:', error);
        throw error; // Propagar el error para manejarlo en el componente
      })
    );
  }
  searchUser(query:string):Observable<Users[]>
  {
    const endpoint = `${this.urlAuth}User/search`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    const params = new HttpParams().set('query',query);
    return this.http.get<Users[]>(endpoint,{params,headers});
  }
  searchProduct(query:string):Observable<Products[]>
  {
    const endpoint = `${this.urlAuth}Product/search`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    const params = new HttpParams().set('query',query);
    return this.http.get<Products[]>(endpoint,{params,headers});
  }
  

  get id():string
  {
    return localStorage.getItem(this.idUser)||'';
  }

  setUserId(id:string)
  {
    localStorage.setItem(this.idUser,id);
  }

  get roleId(): string
  {
    return localStorage.getItem(this.idKeyRol)||'';
  }
  getUserId(): number
  {
    return parseInt(this.id);
  }
  setRoleId(roleId:string):void
  {
    localStorage.setItem(this.idKeyRol,roleId);
  }

  isadmin():boolean
  {
    return this.roleId==="1";
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
  
}


