import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the TodoBuyServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoBuyServiceProvider {

  data: Array<any>;
  savedData: any;
  uri = "http://localhost:8080/api/v1/todobuys";

  constructor(public http: Http) {
    this.data = [];
  }

  load() {
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.uri)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  save2(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.uri, data)
        .map(res => res.json())
        .subscribe(data => {
          this.savedData = data;
          resolve(this.savedData);
        });
    });
  }

  save(book:any): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.uri, JSON.stringify(book), options).toPromise()
            .then(res => {
              let body = res.json();
              return body || {}; 
            })
            .catch(this.handleErrorPromise);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }  

}
