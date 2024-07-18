import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsRegistrationFormComponent } from './pages/products-registration-form/products-registration-form.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    children: [
      { path: "registrationForm", component: ProductsRegistrationFormComponent }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
