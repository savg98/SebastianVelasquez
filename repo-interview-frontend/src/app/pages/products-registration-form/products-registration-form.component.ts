import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-registration-form',
  templateUrl: './products-registration-form.component.html',
  styleUrls: ['./products-registration-form.component.scss']
})
export class ProductsRegistrationFormComponent implements OnInit {

  productsForm!: FormGroup;
  isFormSubmitted = false; 

  constructor() {
  }

  ngOnInit(): void {
    this.initializeForm();
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

  onSubmit(): void {
    this.isFormSubmitted = true; 

    if (this.productsForm.valid) {
      console.log('Formulario válido, enviando datos...');
    } else {
      console.log('El formulario no es válido, corrige los errores antes de enviar.');
    }
  }
}
