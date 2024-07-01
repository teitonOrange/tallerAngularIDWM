import { Component } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  roles:string[]= [];
  isClick:boolean=false;
  isClickProduct:boolean=false;
  rolName: string= '';

  id:string="";

  constructor(private auth:AuthServicesService,private router:Router){}
  ngOnInit(): void {
    this.realName()
  }
  realName(): void {
    this.rolName = this.auth.isadmin() ? 'Administrador' : 'Usuario';
    this.id = this.auth.getUserId().toString();
  }
  isAdmin():boolean
  {
    return this.auth.isadmin();
  }
  isUser():boolean
  {
    return !this.auth.isadmin();
  }
  toggleClick(): void {
    this.isClick = !this.isClick; 
    this.isClickProduct = false;// Cambia el estado de isClick al contrario del estado actual
  }
  toggleClickProduct():void
  {
    this.isClick=false;
    this.isClickProduct=!this.isClickProduct;
  }
  isEdit():boolean
  {
    return this.isClick;
  }
  isProduct():boolean
  {
    return this.isClickProduct;
  }
  goToEditUser()
  {
    this.router.navigate(['auth/edit',this.id])
  }
  outToSesion()
  {
    this.auth.logout();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    });
  }
  goToEditPassword() {
    this.router.navigate(['auth', 'edit', this.id, 'password']);
  }
  goToEditProducts()
  {
    this.router.navigateByUrl('auth/edit/admin/product');
  }
  goToUserEdit()
  {
    this.router.navigateByUrl('auth/edit/admin/users');
  }
  isDefault():boolean
  {
    return !this.isClick && !this.isClickProduct;

  }
  
}
