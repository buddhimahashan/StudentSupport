import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
//import firebase from 'firebase';
import { AcceptedNotification } from "../accepted-notification/accepted-notification";

/**
 * Generated class for the NotificationStaff page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification-staff',
  templateUrl: 'notification-staff.html',
})
export class NotificationStaff {
  StudentAppointment: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire: AngularFire) {
      this.StudentAppointment = angfire.database.list('/StudentAppointment');
  }

 Open2(){
    this.navCtrl.push(AcceptedNotification);
  }

}
