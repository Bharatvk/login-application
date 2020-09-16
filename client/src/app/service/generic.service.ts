import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http:HttpClient) {}
  validateConnection (){
  return  this.http.post('http://localhost:6066/validate', { title: 'Angular POST Request Example' })

}
}