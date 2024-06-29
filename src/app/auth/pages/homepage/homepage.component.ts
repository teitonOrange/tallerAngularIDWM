import { Component } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  roles:string[]= [];
  constructor(private auth:AuthServicesService){}
  isAdmin():boolean
  {
    return this.auth.isadmin();
  }
}
