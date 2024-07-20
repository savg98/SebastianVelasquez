import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { FinancialProductsComponent } from './pages/financial-products/financial-products.component';
import { ProductsRegistrationFormComponent } from './pages/products-registration-form/products-registration-form.component';
import { DeleteModalComponent } from './shared/modals/delete-modal/delete-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FinancialProductsComponent,
    ProductsRegistrationFormComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
