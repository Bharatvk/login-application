import { Component, OnInit } from '@angular/core';
import {Router,ParamMap, ActivatedRoute} from '@angular/router'
import {GenericService} from '../service/generic.service'
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collection:string;
  documents:any
  constructor( private router: Router,
    private route: ActivatedRoute,
    private GenericService: GenericService) { 
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.collection = params.get("collection_name");
      console.log( this.collection)
      })

    }

  ngOnInit(): void {
    let connection_string = sessionStorage.getItem('connection_string');
    this.GenericService.getdocuments({connection_string : connection_string, collection: this.collection}).subscribe((data:any)=>{
      console.log(data);
    this.documents = data.documents;
    })
    
  }

}
