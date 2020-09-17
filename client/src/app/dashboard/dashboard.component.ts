import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service/generic.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   connection_string = localStorage.getItem('connection_string');
   collections : any;

  constructor(private GenericService : GenericService) {
   


   }

  ngOnInit(): void {
  
  this.GenericService.getDbCollections({connection_string:this.connection_string}).subscribe((data:any)=>{
    console.log(data)
    this.collections = data.collections;
    // collections = Object.assign({},collections)
    console.log(this.collections);
  })


  }

viewJson(){

}

}
