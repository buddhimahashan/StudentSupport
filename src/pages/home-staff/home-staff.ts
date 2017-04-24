import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl: AlertController) {
  }

  slot_1 : boolean = true;
  slot1(e): void {
    var isChecked = e.currentTarget.slot_1;
    console.log(e.currentTarget);//undefined
    console.log(this.slot_1);
    if (this.slot_1 == true){
      this.alertMessage("Warning", "Please Select the Lecture")
    }
  }
  slot2(e): void {
    var isChecked = e.currentTarget.slot_1;
    console.log(e.currentTarget);//undefined
    console.log(this.slot_1);
    if (this.slot_1 == true){
      this.alertMessage("Warning", "Please Select the Lecture")
    }
  }

  alertMessage(title, message) {
    let alert = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }


  LogOut(){
       this.navCtrl.push(Logout);
  }


  Open(){
    this.navCtrl.push(Newnotification);
  }

}
