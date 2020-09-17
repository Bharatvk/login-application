import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericService } from '../service/generic.service';
import { Subscriber } from 'rxjs';
import {Router} from "@angular/router"


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('closebutton',{ read: ElementRef }) closebutton;
  public connectionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private GenericService: GenericService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.connectionForm = this.fb.group({
      connection_string: [''],
    });
  }

  submit() {
    console.log(this.connectionForm.value);
    this.GenericService.validateConnection(this.connectionForm.value).subscribe(
      (response: any) => {
        if (response.status == 'success') {
         var connection_string = this.connectionForm.value.connection_string 
          console.log(this.connectionForm.value.connection_string);
          this.closebutton.nativeElement.click();
          localStorage.setItem('connection_string',connection_string)
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Not found');
        }
      }
    );
  }
}
