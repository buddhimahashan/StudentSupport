import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable,AngularFire} from 'angularfire2'


/**
 * Generated class for the Newnotification page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-newnotification',
  templateUrl: 'newnotification.html',
})
export class Newnotification {

  firelist : FirebaseListObservable <any>; 
  Notification:any;
  Years:any;
  Date:any;

  SubmitData(){

    this.angfire.database.list('/Public_Notification').push({
      notification: this.Notification,
      years:this.Years,
      date:this.Date,
    });

   console.log(this.Notification);
   console.log(this.Years);
   console.log(this.Date);
   this.navCtrl.push(Newnotification);
  }


  public event = {

    month: '2017-01-01',
    timeStarts: '08:30'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire : AngularFire) {
  }

}
