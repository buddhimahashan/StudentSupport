import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Requests } from '../requests/requests';
import {AngularFire,FirebaseListObservable} from 'angularfire2';

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

  PublicNotices:FirebaseListObservable<any>;

notification : string = "Responce";
  constructor(public navCtrl: NavController, public navParams: NavParams,platform: Platform,public angfire : AngularFire) {
this.PublicNotices = angfire.database.list('/Public_Notices',{
  query: {
    orderByChild: 'timestamp'
  }
})
   
  }
 navigate(){
      this.navCtrl.push(Requests);
    }
 

}
