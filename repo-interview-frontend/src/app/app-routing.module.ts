import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsRegistrationFormComponent } from './pages/products-registration-form/products-registration-form.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { FinancialProductsComponent } from './pages/financial-products/financial-products.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    children: [
      { path: "registrationForm", component: ProductsRegistrationFormComponent },
      { path: "financialProducts", component: FinancialProductsComponent},
      { path: '**', redirectTo: 'financialProducts'}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
