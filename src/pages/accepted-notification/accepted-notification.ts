import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
//import firebase from 'firebase';

/**
 * Generated class for the AcceptedNotification page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-accepted-notification',
  templateUrl: 'accepted-notification.html',
})
export class AcceptedNotification {

   StudentAppointment: FirebaseListObservable<any>;
   // add session user here
  user : any = "IT17123456";

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire: AngularFire) {
    this.StudentAppointment = angfire.database.list('/StudentAppointment',{
        query: {
          orderByChild: 'user',  
          equalTo: this.user
      },
      });
  }

  RejectEvent(Appointment){

    this.StudentAppointment.update(Appointment.$key,{
      responce : "Reject"
    })
  }

  
}
