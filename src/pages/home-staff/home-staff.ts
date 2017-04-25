import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Newnotification} from '../newnotification/newnotification';

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
  
  slot_1 : boolean;
  slot_2 : boolean;
  slot_3 : boolean;
  slot_4 : boolean;
  slot_5 : boolean;
  slot_6 : boolean;
  slot_7 : boolean;
  slot_8 : boolean;
  slot_9 : boolean;
  slot_10 : boolean;
  slot_11 : boolean;
  slot_12 : boolean;
  slot_13 : boolean;
  slot_14 : boolean;
  slot_15 : boolean;
  slot_16 : boolean;

  slot(e): void {
    if (this.slot_1 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_2 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_3 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_4 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_5 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_6 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_7 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_8 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_9 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_10 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_11 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_12 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_13 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_14 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_15 == true){
      this.alertMessage("Warning", "check the slot")
    }
    if (this.slot_16 == true){
      this.alertMessage("Warning", "check the slot")
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


  Open(){
    this.navCtrl.push(Newnotification);
  }

}
