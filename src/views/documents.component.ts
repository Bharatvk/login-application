import { Component } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router'
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-doc',
  templateUrl: './documents.component.html'
})

export class DocumentComponent {
  constructor(private fb: FormBuilder, private router: Router){

  }

} 