import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoBuyServiceProvider } from '../../providers/todo-buy-service/todo-buy-service';
import { HomePage } from '../home/home'

/**
 * Add Page Component
 */
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  providers: [TodoBuyServiceProvider],
})
export class AddPage {
  todoBuy: any;
  
  /**
   * Add Page Component constructor
   */
  constructor(public navCtrl: NavController, public dataService: TodoBuyServiceProvider) {
    this.todoBuy = {};
  }

  /**
   * Saves the new todobuy on API
   */
  save() {
    this.todoBuy.id = 0;
    this.todoBuy.price = Number(this.todoBuy.price);
    this.todoBuy.done = false;
    this.dataService.save(this.todoBuy)
      .subscribe(data => {
        this.navCtrl.push(HomePage, {});
      });
  }
}
