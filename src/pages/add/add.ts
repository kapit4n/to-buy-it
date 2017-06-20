import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TodoBuyServiceProvider } from '../../providers/todo-buy-service/todo-buy-service';

/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  providers: [ TodoBuyServiceProvider ],
})
export class AddPage {

  constructor(public navCtrl: NavController, public dataService: TodoBuyServiceProvider) {

  }

  save() {
    var data = {name: "Name", imageUrl: "ImageUrl", description: "Description", price: "40000"};
    this.dataService.save(data)
    .then(data => {
      console.log(data);
    });
  }

}
