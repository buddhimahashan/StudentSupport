import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {FirebaseListObservable,AngularFire} from 'angularfire2';

/**
 * Generated class for the Changepassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class Changepassword {

  OldPassowrd : any;
  NewPassword : any;
  ReEnterNewPassword : any;

  firelist : FirebaseListObservable <any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire : AngularFire, public alertCtrl: AlertController) {
  }

 alertMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


UpdatePassword() {

    if (this.NewPassword != "" && this.ReEnterNewPassword != "" && this.OldPassowrd != "") {

        if (window.localStorage.getItem('SessionPassword') == this.OldPassowrd) {

            if (this.NewPassword == this.ReEnterNewPassword) {

                this.firelist = this.angfire.database.list('/login', {
        query: {
          orderByChild: 'uname',
          equalTo: window.localStorage.getItem('SessionName'),
        }
      })



      this.firelist.subscribe(data => {

        console.log(data.length)

        if (data.length > 0) {

          this.firelist.update(data[0].$key, {
           password: this.NewPassword,
            
          });
          
          window.localStorage.setItem('SessionPassword', this.NewPassword);
          window.location.reload();
          


        } 



      })
            } else {
                this.alertMessage("New Password is Not Matched");
            }

        } else {
            this.alertMessage("Old Password is Incorrect");
        }
    } else {
        this.alertMessage("Please fill all fields.");
    }


}
 

}