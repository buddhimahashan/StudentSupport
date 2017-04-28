import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/filter';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Requests page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class Requests {

  RequestDetails:FirebaseListObservable<any>;
  Requests : any;
  angfires:AngularFire;
  username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire : AngularFire,public alertCtrl: AlertController) {
    this.angfires = angfire;
    this.username=window.localStorage.getItem('SessionName');
  this.RequestDetails = angfire.database.list('/StudentAppointment', {
      query: {
        orderByChild: 'user',
        equalTo: this.username
      }
      
    })
  }

  ionViewDidLoad() {

  }

  deleteRequests(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
        this.RequestDetails.remove(id).then(res=>{
        });
          
         resolve(true);
      });
   }

  CancelRequest(key){
    let confirm = this.alertCtrl.create({
      title: 'Cancel Appointment?',
      message: 'Are you sure you want to Cancel Appointment?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteRequests(key);
          console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
