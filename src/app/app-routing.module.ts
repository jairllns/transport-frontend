import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';


const app_routes: Routes = [
    { path: 'createCompany', component: CreateCompanyComponent,  data: { routeName: "Crear Empresa" }},

   
];
@NgModule({
  imports: [RouterModule.forRoot(app_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }