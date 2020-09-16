import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
const axios = require('axios').default;
@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor() {}

   validateConnection() : Observable<any[]> {
  
    let observable$ = Observable.create( ( observer ) => {
      axios.get( 'http://localhost/validate' )
      .then( ( response ) => {
          observer.next( response.data );
          observer.complete();
      } )
      .catch( ( error ) => {
          observer.error( error );
      } );
  } );
   return observable$
}
}