import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {Newnotification} from '../newnotification/newnotification';
import { AngularFireModule,FirebaseListObservable} from 'angularfire2';

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

  // slot_1: FirebaseListObservable<boolean>;
  // slot_2: FirebaseListObservable<boolean>;
  // slot_3: FirebaseListObservable<boolean>;
  // slot_4: FirebaseListObservable<boolean>;
  // slot_5: FirebaseListObservable<boolean>;
  // slot_6: FirebaseListObservable<boolean>;
  // slot_7: FirebaseListObservable<boolean>;
  // slot_8: FirebaseListObservable<boolean>;
  // slot_9: FirebaseListObservable<boolean>;
  // slot_10: FirebaseListObservable<boolean>;
  // slot_11: FirebaseListObservable<boolean>;
  // slot_12: FirebaseListObservable<boolean>;
  // slot_13: FirebaseListObservable<boolean>;
  // slot_14: FirebaseListObservable<boolean>;
  // slot_15: FirebaseListObservable<boolean>;
  // slot_16: FirebaseListObservable<boolean>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alerCtrl: AlertController,public loadingCtrl: LoadingController,angFire:AngularFireModule) {

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
  
  public dayValue:String;
  // onChange(dayValue) {
  //    console.log(dayValue);
  // }

  slot(e): void {
    var slotSet = firebase.database().ref("staffSlot/");
    if (this.slot_1 == true){
      // this.alertMessage("Warning", "check the slot")
          slotSet.set({
            day: this.dayValue,
            slot: {
                slotId: 'slot_1',
                status: this.slot_1
            }
          });
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
  presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }


  Open(){
    this.navCtrl.push(Newnotification);
  }

}
