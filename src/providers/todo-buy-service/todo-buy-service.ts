import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/**
 * Service to handle todobuy resouces
 */
@Injectable()
export class TodoBuyServiceProvider {

  /** todobuy items */
  data: Array<any>;
  /** savedData */
  savedData: any;
  /** API url */
  uri = "http://localhost:8080/api/v1/todobuys";


  /**
   * TodoBuy Service Constructor
   */
  constructor(public http: Http) {
    this.data = [];
    this.uri = "assets/todobuy.json";
  }

  /** 
   * Load todobuy items from API
   */
  load() {
    return new Promise(resolve => {
      this.http.get(this.uri)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  /** 
   * Call the post method to save todobuy on the API
   */
  save(todoBuy) {
    let body = JSON.stringify(todoBuy);
    return this.http.post(this.uri, body)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  /**
   * Updates the todobuy item on API
   */
  submitTodoBuy(todoBuy, id) {
    let body = JSON.stringify(todoBuy);
    return this.http.post(this.uri + "/" + id, body)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }
  
  /**
   * Handles the response error
   */
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
