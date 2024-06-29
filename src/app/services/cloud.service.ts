import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthServicesService } from '../auth/services/auth-services.service';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private baseUrl: string = "http://localhost:5023/api/"

  constructor(private http: HttpClient,private authService: AuthServicesService ) {
    console.log("hola");
   }
  async login (form: any): Promise<ResponseApi>{
      try{
        const data = await firstValueFrom(this.http.post<ResponseApi>(this.baseUrl+'auth/login',form.value));
        if(data.token){
          this.authService.setRut(data.rut);
          this.authService.setToken(data.token);
        }
        return Promise.resolve(data);
      }catch(error:any)
      {
        console.log("Error en el login", error);
        let e =  error as HttpErrorResponse;
        return Promise.reject(error);
      }
   }
   register(form: Register) {
    return this.http.post(this.baseUrl+'auth/register',form).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en el registro', error);
    return throwError(error);
  }
}
