import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service/generic.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  connection_string = sessionStorage.getItem('connection_string');
  collections: any;
  single_collection: any;
  documents: any;
  findForm: FormGroup;
  linkActive: string;
  constructor(
    private GenericService: GenericService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GenericService.getDbCollections({
      connection_string: this.connection_string,
    }).subscribe((data: any) => {
      console.log(data);
      this.collections = data.collections;
      // collections = Object.assign({},collections)
      console.log(this.collections);
    });

    this.findForm = this.fb.group({
      find_query: [''],
      projection: [''],
      sort: [''],
      skip: [''],
      limit: [''],
    });
  }

  viewdocuments(collection_name) {
    let connection_string = sessionStorage.getItem('connection_string');
    this.single_collection = collection_name;
    (<HTMLElement>document.getElementById('findForm')).style.display = 'block';
    let filter = {
      connection_string: connection_string,
      collection: this.single_collection,
    };
    this.getDocuments(filter);
  }

  getDocuments(params) {
    this.GenericService.getdocuments(params).subscribe((data: any) => {
      console.log(data);
      this.documents = data.documents;
    });
  }

  toggleJson(id) {
    console.log('clicked', id);
    var division = <HTMLElement>document.getElementById('json_' + id);
    var span = <HTMLElement>document.getElementById('arrow_' + id);

    if (division.style.display == 'none') {
      division.style.display = 'block';
      span.innerHTML =
        '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>    </svg>';
    } else {
      division.style.display = 'none';
      span.innerHTML =
        '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/> </svg>';
    }
  }

  executeFind() {
    this.findForm.value.connection_string = this.connection_string;
    this.findForm.value.collection = this.single_collection;
    console.log(this.findForm.value);
    this.getDocuments(this.findForm.value)

  }

  downloadRecords(){
    this.findForm.value.connection_string = this.connection_string;
    this.findForm.value.collection = this.single_collection;
    console.log("this.findForm.value", this.findForm.value)
    this.GenericService.downloadRecords(this.findForm.value).subscribe((data: any) => {
      console.log(data);
      this.GenericService.downloadFile(data).subscribe((blob: any) => {
        const a = document.createElement('a')
        // const objectUrl = window.URL.createObjectURL(blob)
        a.href = 'http://localhost:6066/api/connection/downloadFile/'+data.filename;
        a.download = data.filename;
        // a.target = "_blank"
        a.click();
        // URL.revokeObjectURL(objectUrl);
      })
    });
  }
}
