import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {

  UserType:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  SetUserDetails(){

    console.log(this.UserType);
    window.localStorage.setItem('session', this.UserType);
    console.log(window.localStorage.getItem('session'));
    this.navCtrl.push(TabsPage);
  }
}