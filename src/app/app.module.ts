import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import {DocumentComponent} from '../views/documents.component'   
import {LoginComponent} from './login.component'  
const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot((routes)),
    RecaptchaModule.forRoot({
      siteKey: '6LeJJ7AZAAAAAKkYw3N5D2rmZcIIJ_-1K1SdtbdU',
  }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
