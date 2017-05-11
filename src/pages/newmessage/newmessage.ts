import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Newmessage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-newmessage',
  templateUrl: 'newmessage.html',
})
export class Newmessage {

  UserData: any;
  MessageUserType: string;
  UserDataList = [];

  Message: any;
  Title: any;
  User: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, public alertCtrl: AlertController) {

     
  }

  alertMessage(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }



  SendMessage(){
    
     if (this.Message == undefined || this.Message == '') {
      this.alertMessage("Warning!", "Check Message details");
    } else if (this.User == undefined || this.User == '') {
      this.alertMessage("Warning!", "Check User details");
    }else if (this.Title == undefined || this.Title == '') {
      this.alertMessage("Warning!", "Check User details");
    }else{

      this.angfire.database.list('/Messages').push({
              To: this.User,
              From :  window.localStorage.getItem('SessionName'),
              Title : this.Title,
              Message : this.Message
            });
    }

  }


}
