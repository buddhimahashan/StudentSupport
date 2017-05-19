import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/filter';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


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
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public alerCtrl: AlertController,public navParams: NavParams,public angfire : AngularFire,public alertCtrl: AlertController) {
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

   alertMessage(title, message) {
    let alert = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
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

presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
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
            this.presentLoading();
            this.deleteRequests(key);
            this.alertMessage("Succesful!", "Your Appointment Succesfully Cancelled");
          console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
