import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { AlertController } from 'ionic-angular';
import { EditPublicNotification } from '../edit-public-notification/edit-public-notification';


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

  firelist: FirebaseListObservable<any>;
  Notice: any;
  Years: any;
  Date: String = new Date().toISOString();
 //ionic  Date: any;
  Description: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,
    public alertCtrl: AlertController) {
  }
  alertMessage(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }

  SubmitData() {
    if (this.Years == undefined || this.Years == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else if (this.Notice == undefined || this.Notice == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else if (this.Years == undefined || this.Years == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else if (this.Date == undefined || this.Date == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else {
      if (this.Description == undefined || this.Description == '') {
        this.Description = '';
        this.MakeAppointment();
      }
      else{
        this.MakeAppointment();
      }
    }


    console.log(this.Notice);
    console.log(this.Years);
    console.log(this.Date);
    console.log(this.Description);
    this.navCtrl.push(Newnotification);
  }

  MakeAppointment() {
    let confirm = this.alertCtrl.create({
      title: 'Add Notice?',
      message: 'Are you sure you want to publish this Notice?',
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
            this.angfire.database.list('/Public_Notices').push({
              notification: this.Notice,
              years: this.Years,
              date: this.Date,
              Description: this.Description,
              User :  window.localStorage.getItem('SessionName'),
            });
            console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  EditPage(){
    this.navCtrl.push(EditPublicNotification);

  }


  public event = {

    month: '2017-01-01',
    timeStarts: '08:30'
  }
}
