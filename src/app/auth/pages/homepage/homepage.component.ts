import { Component } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {//homepage de clientes y admin
  roles:string[]= [];
  constructor(private auth:AuthServicesService, private router: Router){}
  isAdmin():boolean
  {
    return this.auth.isadmin();
  }
  navigateToPurchase(){
    this.router.navigate(['/auth/purchase']);
  }
}
