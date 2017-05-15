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

  // add session user here
  user : any = "IT17123456";
  CompareData : any;
  AssignData : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire: AngularFire) {
      this.StudentAppointment = angfire.database.list('/StudentAppointment',{
        query: {
          orderByChild: 'user',  
          equalTo: this.user
      },
      });
  }

  AcceptEvent(Appointment){

    this.StudentAppointment.update(Appointment.$key,{
      responce : "Accept"
    })
  }

  RejectEvent(Appointment){

    this.StudentAppointment.update(Appointment.$key,{
      responce : "Reject"
    })
  }

  //   this.CompareData = this.angfire.database.list('/StudentAppointment', {
  //       query: {
  //         orderByChild: 'user',  
  //         equalTo: this.user
  //       },
  //       preserveSnapshot: true
  //        }).subscribe(snapshots => {
  //            let CompareDataArray = [];
  //            snapshots.forEach(snapshot => {
  //                CompareDataArray.push(snapshot.val());
  //             });

  //        CompareDataArray[0].responce="Accept";
  //       })
  // }
   
  Open2(){
    this.navCtrl.push(AcceptedNotification);
  }

}
