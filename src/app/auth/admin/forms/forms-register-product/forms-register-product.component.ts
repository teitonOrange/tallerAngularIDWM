import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from 'src/app/auth/interfaces/products';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';

@Component({
  selector: 'app-forms-register-product',
  templateUrl: './forms-register-product.component.html',
  styleUrls: ['./forms-register-product.component.css']
})
export class FormsRegisterProductComponent implements OnInit {
  createProduct!: FormGroup;
  types: ProductType[] = [];
  id: number = -1;
  selectedOption: string = '';
  selectedFile: File | null = null; // Variable para almacenar el archivo seleccionado

  constructor(
    private service: AuthServicesService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadTypes();
  }

  createForm() {
    this.createProduct = this.fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(64),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s]+$')
        ]
      ],
      Price: ['', [Validators.required]],
      Stock: ['', [Validators.required]],
      Image: [null],
      ProductTypeId: ['', [Validators.required]]
    });
  }

  onSelectionChange() {
    this.createProduct.patchValue({ ProductTypeId: this.selectedOption });
  }

  loadTypes(): void {
    this.service.getTypesProducts().subscribe({
      next: (products) => {
        this.types = products;
      }
    });
  }

  onSubmit(): void {
    if (this.createProduct.valid) {
      const formData = new FormData();
      formData.append('Name', this.createProduct.get('Name')?.value);
      formData.append('Price', this.createProduct.get('Price')?.value);
      formData.append('Stock', this.createProduct.get('Stock')?.value);
      formData.append('ProductTypeId', this.createProduct.get('ProductTypeId')?.value);

      if (this.selectedFile) {
        formData.append('Image', this.selectedFile);
      }

      this.service.createProduct(formData).subscribe(
        response => {
          console.log('Actualización exitosa', response);
          this.router.navigateByUrl('auth/edit/admin/product');
        },
        error => {
          console.error('Error en la actualización', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.createProduct);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  backToProducts() {
    this.router.navigateByUrl('auth/edit/admin/product');
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.createProduct.patchValue({
        Image: file.name // Solo para propósitos de validación
      });
    }
  }
}
