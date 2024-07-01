import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from 'src/app/auth/interfaces/products';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';

@Component({
  selector: 'app-forms-crud',
  templateUrl: './forms-crud.component.html',
  styleUrls: ['./forms-crud.component.css']
})
export class FormsCrudComponent {

  productUpdate!:FormGroup;
  types:ProductType[]=[];
  id:number = -1;
  selectedOption: string = '';
  constructor(
    private service:AuthServicesService,
    private router:Router,
    private fb: FormBuilder,
    private route:ActivatedRoute
  ){}
  
  ngOnInit():void
  {
    this.createForm();
    this.loadTypes();
    this.getIdProduct();
  }
  createForm()
  {
    this.productUpdate = this.fb.group({
      Name:[''],
      Price:[''],
      Stock:[''],
      Image:[null],
      ProductTypeId:['']
    })
  }
  onSelectionChange()
  {
    this.productUpdate.patchValue({productTypeId: this.selectedOption})
  }
  getIdProduct(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : -1; // Convertir a número, o asignar null si no se puede convertir
  }
  onSubmit(): void {
    if (this.productUpdate.valid && this.id > -1) {
        const formValue = this.productUpdate.value;
        this.service.editProduct(this.id, formValue).subscribe(
            response => {
                if (response && response.message === 'Producto editado con éxito.') {
                    console.log('Actualización exitosa', response);
                    this.router.navigateByUrl('auth/edit/admin/product');
                } else {
                    console.error('Respuesta inesperada del servidor', response);
                    // Manejar caso inesperado si la respuesta no es la esperada
                }
            },
            error => {
              if(error.message ==='Producto editado con éxito.')
                {
                  console.log('Actualización exitosa', error);

                }else
                {
                  console.error('Error en la actualización', error);

                }
            }
        );
    } else {
        this.markFormGroupTouched(this.productUpdate);
    }
}
  loadTypes(): void {
    this.service.getTypesProducts().subscribe({
      next:(products) =>{
        this.types =products; 
        },
      }
    );
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  backToProducts()
  {
    this.router.navigateByUrl('auth/edit/admin/product');
  }
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
        const file = event.target.files;
        this.productUpdate.patchValue({
            Image: file
        });
    }
}


}
