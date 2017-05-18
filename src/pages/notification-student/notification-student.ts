import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Requests } from '../requests/requests';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Viewnotices } from '../viewnotices/viewnotices';
import { HomeStudent } from '../home-student/home-student';

/**
 * Generated class for the NotificationStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification-student',
  templateUrl: 'notification-student.html',
})
export class NotificationStudent {

RequestDetails:FirebaseListObservable<any>;
 // Requests : any;
  angfires:AngularFire;
  PublicNotices: FirebaseListObservable<any>;
  
  notification: string = "Responce";
  noticeyear: any;
  noticedate: any;
  noticetitle: any;
  noticedescription: any;

 Date: String = new Date().toISOString();

  today:any;
  dd:any;
  mm:any;
  yyyy:any;

  Years:any;
   year: string;
   username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, public angfire: AngularFire) {

   this.Date = this.event.month
   this.today = this.event.month.split("T")[0]
    this.username=window.localStorage.getItem('SessionName');
    this.PublicNotices = angfire.database.list('/Public_Notices', {
      query: {
        orderByChild: 'dateView',
        equalTo: this.Date.split("T")[0]
      }
      
    })

     this.angfires = angfire;
    this.RequestDetails = angfire.database.list('/StudentAppointment', {
      query: {
        orderByChild: 'user',
        equalTo: this.username
      }
      
    })
    console.log(this.username);
  }

  navigate() {
    this.navCtrl.push(Requests);
  }

  navigate2(year, title, date, notice) {
    this.navCtrl.push(Viewnotices);
    this.noticeyear = year;
    this.noticedate = date;
    this.noticetitle = title;
    this.noticedescription = notice;
    window.localStorage.setItem('Noticeyear', this.noticeyear);
    window.localStorage.setItem('Noticetitle', this.noticetitle);
    window.localStorage.setItem('NoticeDate', this.noticedate.split("T")[0]);
    window.localStorage.setItem('NoticeDescription', this.noticedescription);


  }
NewApointment(){
  this.navCtrl.push(HomeStudent);
}

/*Today() {
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth()+1; 
    this.yyyy = this.today.getFullYear();

    if(this.dd<10) {
      this.dd='0'+this.dd
    } 

    if(this.mm<10) {
      this.mm='0'+this.mm
    } 

    this.today = this.yyyy+'-'+this.mm+'-'+this.dd;
      return this.today;
}
*/

public event = {

    month: new Date().toISOString(),
    
  }

}
