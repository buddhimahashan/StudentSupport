import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
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
    

  RemoveData: any;
  StudentAppointment: FirebaseListObservable<any>;

  slotLecId : any;
  slotday : any;
  slotname: any;
  slotdate: Date;
  slottime: any;

  // add session user here
  user : any = window.localStorage.getItem('SessionName');
  CompareData : any;
  AssignData : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire: AngularFire) {
      this.StudentAppointment = angfire.database.list('/StudentAppointment',{
        query: {
          orderByChild: 'lectureusername',  
          equalTo: this.user
      },
      });
  }


  AcceptEvent(Appointment){

    
    this.StudentAppointment.update(Appointment.$key,{
      responce : "Accept"
    })

    this.angfire.database.list('/ReservedSlots').push({
      tokenID: Appointment.$key,
      lectureID: Appointment.lecture,
      studentId: Appointment.user,
      date: Appointment.date,
      time: Appointment.time
      
    });    

    this.slotLecId=Appointment.lectureusername;
    this.slotdate=Appointment.date;
    this.slottime=Appointment.time;

    console.log(this.slotdate);
    var d = new Date(this.slotdate);
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    console.log(d.getDay());
    let n = weekday[d.getDay()];
    this.slotday = n;

    if (this.slottime == "09.00 - 09.30") {
          this.slotname = "slot_1";
        } else if (this.slottime == "09.30 - 10.00") {
          this.slotname = "slot_2";
        } else if (this.slottime == "10.00 - 10.30") {
          this.slotname = "slot_3";
        } else if (this.slottime == "10.30 - 11.00") {
          this.slotname = "slot_4"
        } else if (this.slottime == "11.00 - 11.30") {
          this.slotname = "slot_5"
        } else if (this.slottime == "11.30 - 12.00") {
          this.slotname = "slot_6"
        } else if (this.slottime == "12.00 - 12.30") {
          this.slotname = "slot_7"
        } else if (this.slottime == "12.30 - 13.00") {
          this.slotname = "slot_8"
        } else if (this.slottime == "13.00 - 13.30") {
          this.slotname = "slot_9"
        } else if (this.slottime == "13.30 - 14.00") {
          this.slotname = "slot_10"
        } else if (this.slottime == "14.00 - 14.30") {
          this.slotname = "slot_11"
        } else if (this.slottime == "14.30 - 15.00") {
          this.slotname = "slot_12"
        } else if (this.slottime == "15.00 - 15.30") {
          this.slotname = "slot_13"
        } else if (this.slottime == "15.30 - 16.00") {
          this.slotname = "slot_14"
        } else if (this.slottime == "16.00 - 16.30") {
          this.slotname = "slot_15"
        } else if (this.slottime == "16.30 - 17.00") {
          this.slotname = "slot_16"
        } else if (this.slottime == "17.00 - 17.30") {
          this.slotname = "slot_17"
        } else if (this.slottime == "17.30 - 18.00") {
          this.slotname = "slot_18"
        } else if (this.slottime == "18.00 - 18.30") {
          this.slotname = "slot_19"
        } else if (this.slottime == "18.30 - 19.00") {
          this.slotname = "slot_20"
        }

    firebase.database().ref('staffSlot/'+this.slotLecId+'/'+this.slotday +'/'+this.slotname).set({
                status: 'false'
                       
    });    

  }

  RejectEvent(Appointment){

    this.StudentAppointment.update(Appointment.$key,{
      responce : "Reject"
    })

  }
   
  Open2(){
    this.navCtrl.push(AcceptedNotification);
  }

}
