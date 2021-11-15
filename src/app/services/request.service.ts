import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  urlBase : string = '';
  production : boolean;

  constructor(  private http: HttpClient) {

    this.urlBase = environment.server;
    this.production = environment.production  
  }


  sendRequest(method: string, params: any, methohttp: string) {
    
    if (methohttp == 'get'){
      return this.http.get(this.urlBase + method, params).pipe(
        tap(event => {
          
        }, error => {
         
        })
      );
    }

    if (methohttp == 'post'){
      return this.http.post(this.urlBase + method, params).pipe(
        tap(event => {
          
        }, error => {
         
        })
      );
    }
   
  }

}
