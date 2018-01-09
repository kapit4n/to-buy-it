import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoBuyServiceProvider } from '../../providers/todo-buy-service/todo-buy-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ TodoBuyServiceProvider ]
})
export class HomePage {
  data:Array<any> = [];
  constructor(public navCtrl: NavController, public dataService: TodoBuyServiceProvider) {
    this.load();
  }

  load() {
    this.dataService.load()
    .then(data => {
      this.data = data as Array<any>;
    }, function(error) {
      console.log("This is the error");
    });
  }

  submitBuy(event, id) {
    var todo = {id: id, name: "xx", imageUrl: "xx", price: "0", description: "xx", done: true};
    this.dataService.submitTodoBuy(todo, id).subscribe(data => {
      console.log(data);
    });
  }
}
