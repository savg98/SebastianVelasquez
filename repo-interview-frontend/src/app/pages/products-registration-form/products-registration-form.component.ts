import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FinancialProductsData, FinancialProductsUpdateData } from 'src/app/interfaces/financial-products-interface';
import { financialProductsService } from 'src/app/services/financial-products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-registration-form',
  templateUrl: './products-registration-form.component.html',
  styleUrls: ['./products-registration-form.component.scss']
})
export class ProductsRegistrationFormComponent implements OnInit {

  productsForm!: FormGroup;
  isFormSubmitted: boolean = false;
  today: string;
  updating: boolean = false; // Nueva variable para determinar el modo de edición

  constructor(
    private router: Router,
    private financialProductsService: financialProductsService,
    private route: ActivatedRoute
  ) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getReleaseDate();

    this.route.queryParams.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          this.updating = true;
          return this.financialProductsService.getFinancialProductById(id);
        } else {
          return [];
        }
      })
    ).subscribe({
      next: product => {
        if (product) {
          this.fillForm(product);
        }
      },
      error: error => console.error('Error al cargar el producto:', error)
    });
  }

  private initializeForm(): void {
    this.productsForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      logo: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required),
      revisionDate: new FormControl({ value: '', disabled: true }, Validators.required)
    });
  }

  private getReleaseDate(): void {
    this.productsForm.get('releaseDate')?.valueChanges.subscribe(releaseDate => {
      if (releaseDate) {
        const revisionDate = this.calculateRevisionDate(releaseDate);
        this.productsForm.get('revisionDate')?.setValue(revisionDate);
      } else {
        this.productsForm.get('revisionDate')?.reset();
      }
    });
  }

  private calculateRevisionDate(releaseDate: string): string {
    const date = new Date(releaseDate);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  }

  private fillForm(product: FinancialProductsData): void {
    this.productsForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      releaseDate: product.date_release,
      revisionDate: product.date_revision
    });
  }

  onSubmit(): void {
    const data = {
      id: this.productsForm.get('id')?.value,
      name: this.productsForm.get('name')?.value,
      description: this.productsForm.get('description')?.value,
      logo: this.productsForm.get('logo')?.value,
      date_release: this.productsForm.get('releaseDate')?.value,
      date_revision: this.productsForm.get('revisionDate')?.value
    };

    if (this.updating) {
      const id = this.productsForm.get('id')?.value;
      this.financialProductsService.updateFinancialProduct(id, data).subscribe({
        next: (res) => {
          console.log('Producto financiero actualizado con éxito:', res);
        },
        error: (error) => {
          console.error('Error al actualizar el producto financiero:', error);
        }
      });
    } else {
      const id = this.productsForm.get('id')?.value;

      this.financialProductsService.createFinancialProduct(data).subscribe({
        next: (res) => {
          console.log('Producto financiero creado con éxito:', res);
        },
        error: (error) => {
          console.error('Error al crear el producto financiero:', error);
        }
      });
    }

    this.isFormSubmitted = true;
    this.router.navigate(['/financialProducts']);
  }
}
