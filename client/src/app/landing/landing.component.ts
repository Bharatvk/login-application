import { Component, OnInit } from '@angular/core';
import{ FormBuilder,FormGroup}from '@angular/forms'
import {GenericService} from '../service/generic.service'
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public connectionForm: FormGroup;
  constructor(private fb: FormBuilder,
    private GenericService : GenericService
    ) { }

  ngOnInit(): void {
    this.connectionForm = this.fb.group({
      "connection_string":['']
    })
  }

  submit(){
    console.log(this.connectionForm.value);
    this.GenericService.validateConnection().subscribe((response:any)=>{
      console.log(response);
    } )
    
    
  }

}
