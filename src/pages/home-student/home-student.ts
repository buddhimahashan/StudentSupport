import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-student',
  templateUrl: 'home-student.html',
})
export class HomeStudent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public event = {
    month: '2017-01-01'
  }
 

  

}
