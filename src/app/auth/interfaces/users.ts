
export interface Users {
status: any;
    id:number;
    rut:string;
    name:string;
    birthday:string;
    email:string;
    isActive:boolean;
    gender:Gender;
    role:Role;
}
export interface Gender
{
    id:number;
    type:string;
}
export interface Role
{
    id:number;
    type:string;
}
