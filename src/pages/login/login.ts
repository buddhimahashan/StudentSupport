import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {
  

  UserType:any;
  UserName:any;
  UserPassword:any;

  uname : string;
  password : string;
  utype : string;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  alertMessage(message){
    let alert = this.alertCtrl.create({
      title: 'Login Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  SetUserDetails(){

    this.uname = this.UserName;
    this.password = this.UserPassword;
    this.utype = this.UserType;

    if(this.uname == undefined || this.uname==''){
          this.alertMessage("User Name cannot be empty");
    }else if(this.password == undefined || this.password==''){
          this.alertMessage("Password cannot be empty");
    }else if(this.utype == undefined || this.utype==''){
          this.alertMessage("Select User Type");
    }else{
      console.log(this.UserName);
      console.log(this.UserPassword);
      console.log(this.UserType);

      window.localStorage.setItem('SessionName', this.uname);
      window.localStorage.setItem('SessionType', this.uname);

      this.navCtrl.push(TabsPage);
      
    }
  }
}