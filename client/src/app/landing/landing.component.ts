import { Component, OnInit, ViewChild } from '@angular/core';
import{ FormBuilder,FormGroup}from '@angular/forms'
import {GenericService} from '../service/generic.service'
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  public connectionForm: FormGroup;
  public step: String = "landing";
  public collectionsList: any;
  constructor(private fb: FormBuilder,
    private GenericService : GenericService
    ) { }

  ngOnInit(): void {
    this.connectionForm = this.fb.group({
      "connection_string":['']
    })
  }

  submit(){
    console.log("value",this.connectionForm.value);
    var connection_string = this.connectionForm.value? this.connectionForm.value.connection_string: "";
    var params = {
      connection_string: connection_string
    }
    this.GenericService.validateConnection(params).subscribe((response:any)=>{
      console.log(response);
      this.closebutton.nativeElement.click();
      if(response.status == "success"){
        this.step = "successConnection";
        this.collectionsList = response.collections;

      }
    } )
    
    
  }

}
