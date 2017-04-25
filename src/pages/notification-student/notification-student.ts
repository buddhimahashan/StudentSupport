import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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

notification : string = "PublicNotifications";
  constructor(public navCtrl: NavController, public navParams: NavParams,platform: Platform) {
  }

 

}
