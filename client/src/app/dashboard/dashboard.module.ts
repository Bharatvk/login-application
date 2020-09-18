import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class DashboardModule { }
