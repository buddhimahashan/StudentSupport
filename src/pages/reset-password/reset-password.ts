import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable,AngularFire} from 'angularfire2';
//import { TabsPage } from '../tabs/tabs';
import { Profile } from '../profile/profile';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ResetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPassword {


 firelist : FirebaseListObservable <any>;
OldPassowrd : any;
NewPassword : any;
ReEnterNewPassword : any;

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

                this.angfire.database.list('/login').push({
                    uname: window.localStorage.getItem('SessionName'),
                    password: this.NewPassword,
                    type: window.localStorage.getItem('SessionType'),
                });
                window.localStorage.setItem('SessionPassword', this.NewPassword);
                console.log(window.localStorage.getItem('SessionName'));
                this.firelist = this.angfire.database.list('/MainUsers', {
                    query: {
                        orderByChild: 'uname',
                        equalTo: window.localStorage.getItem('SessionName'),
                    }
                })

                this.firelist.subscribe(data => {
                    data.forEach(element => {
                        this.firelist.remove(element.$key);
                        console.log(element);

                    });
                });
                window.localStorage.setItem('LoginFlag', "true");
                this.navCtrl.push(Profile);
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
