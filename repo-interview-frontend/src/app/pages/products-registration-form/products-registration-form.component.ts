import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-registration-form',
  templateUrl: './products-registration-form.component.html',
  styleUrls: ['./products-registration-form.component.scss']
})
export class ProductsRegistrationFormComponent implements OnInit {

  productsForm!: FormGroup;
  isFormSubmitted:boolean = false; 
  today:string;

  constructor(private router: Router) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0]; 
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getReleaseDate();
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

  onSubmit(): void {
    this.isFormSubmitted = true; 
    this.router.navigate(['/financialProducts']); 
  }
}
