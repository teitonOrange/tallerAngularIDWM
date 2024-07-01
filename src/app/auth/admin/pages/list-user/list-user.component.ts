import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { share } from 'rxjs';
import { Users } from 'src/app/auth/interfaces/users';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  userList:Users[]=[];
  query:string ='';
  @ViewChild('queryInput') queryInput!: NgForm; // Referencia al input usando ViewChild

  constructor(private services: AuthServicesService, private router: Router ){}
  ngOnInit(): void {
    this.loadUsers()
  }
  loadUsers(): void {
    this.services.getUserAll().subscribe({
      next:(users) =>{
        this.userList =users; 
        },
      }
    );
  }
  onSubmit()
  {
    this.searchUser();
  }
  changeState(id: number, newUserState: boolean) {
    const stringState = newUserState ? 'true' : 'false';
    console.log(stringState);
  
    this.services.changeUserState(id, stringState).subscribe(
      response => {
        console.log('Estado cambiado con éxito:', response);
      },
      error => {
        console.error('Error cambiando el estado:', error);
      }
    );
  }
  
  searchUser(): void {
    if (!this.query.trim()) {
      return;
    }

    this.services.searchUser(this.query).subscribe({
      next: (users) => {
        this.userList = users;
      },
      error: (error) => {
        console.error('Error buscando usuarios:', error);
      }
    });

    // Limpia el valor en la propiedad y resetea el input
    this.query = '';
    this.queryInput.reset();
  }
  
  
  backToHome()
  {
    this.router.navigateByUrl('auth/');
    
  }
  formatDate(dateString: string): string {
    if (!dateString) return ''; // Manejo de casos donde la fecha podría ser nula

    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0]; // Obtiene solo YYYY-MM-DD
    return formattedDate;
  }
  
  

}
