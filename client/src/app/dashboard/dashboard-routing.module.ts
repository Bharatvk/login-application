import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CollectionComponent} from './collection.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':collection_name', component: CollectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
