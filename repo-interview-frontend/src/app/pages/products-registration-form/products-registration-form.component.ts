import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-registration-form',
  templateUrl: './products-registration-form.component.html',
  styleUrls: ['./products-registration-form.component.scss']
})
export class ProductsRegistrationFormComponent implements OnInit {

  productsForm: FormGroup;

  constructor() {
    this.productsForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required),
      revisionDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

}
