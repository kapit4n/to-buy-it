import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoBuyServiceProvider } from '../../providers/todo-buy-service/todo-buy-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ TodoBuyServiceProvider ]
})
export class HomePage {

  constructor(public navCtrl: NavController, public dataService: TodoBuyServiceProvider) {
    this.load();
  }
  load() {
    this.dataService.load()
    .then(data => {
      console.log(data);
    }, function(error) {
      console.log("This is the error");
    });
  }

}
