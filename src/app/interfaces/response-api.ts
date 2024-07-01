export interface Gender {
    id: number;
    type: string;
  }
  
  export interface Role {
    id: number;
    type: string;
  }
  
  export interface User {
    birthday: string;
    email: string;
    gender: Gender;
    id: number;
    isActive: boolean;
    name: string;
    role: Role;
    rut: string;
  }
export interface ResponseApi {
    message: string;
    token: string;
    user: User;
}
export interface ResponseApiError{
    message: string;
    error: string;
}
