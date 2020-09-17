import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http:HttpClient) {}
  validateConnection (params){
  return  this.http.post('http://localhost:6066/api/connection/connectDatabase', params)

}
getDbCollections (params){
  console.log(params);
  return  this.http.post('http://localhost:6066/api/connection/getDbCollections',params)

}

getdocuments (params){
  console.log(params);
  return  this.http.post('http://localhost:6066/api/connection/getdocuments',params)

}



}