import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentComponent} from '../views/documents.component'

import { LoginComponent } from './login.component';
import {Routes, RouterModule, Router} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'documents', component: DocumentComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
