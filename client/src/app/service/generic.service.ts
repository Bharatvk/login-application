import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http:HttpClient) {}
  validateConnection (params){
  return  this.http.post('http://localhost:6066/database/validate', params)

}
getDbCollections (params){
  console.log(params);
  return  this.http.post('http://localhost:6066/database/getDbCollections',params)

}

getdocuments (params){
  console.log(params);
  return  this.http.post('http://localhost:6066/database/getdocuments',params)

}



}