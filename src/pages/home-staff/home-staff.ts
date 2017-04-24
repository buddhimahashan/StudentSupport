import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Newnotification} from '../newnotification/newnotification';
import { Logout } from '../logout/logout';
/**
 * Generated class for the HomeStaff page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-staff',
  templateUrl: 'home-staff.html',
})
export class HomeStaff {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  LogOut(){
       this.navCtrl.push(Logout);
  }


  Open(){
    this.navCtrl.push(Newnotification);
  }

}
