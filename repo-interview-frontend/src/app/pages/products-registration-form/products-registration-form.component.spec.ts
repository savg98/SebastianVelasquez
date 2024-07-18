import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRegistrationFormComponent } from './products-registration-form.component';

describe('ProductsRegistrationFormComponent', () => {
  let component: ProductsRegistrationFormComponent;
  let fixture: ComponentFixture<ProductsRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
