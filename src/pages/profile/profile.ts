import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,
    public actionsheetCtrl: ActionSheetController,public alertCtrl: AlertController) {
  }

 openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'More',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Settings',
          icon:'settings',
          handler: () => {
            console.log('Settings Clicked');
          }
        },
        
        {
          text: 'About',
          icon: 'about',
          handler: () => {
            console.log('About clicked');
          }
        },

          {
          text: 'Logout',
          icon: 'logout',
          handler: () => {
          this.logout()
          console.log("Logout Clicked");
 }
        }
      ]
    });
    actionSheet.present();
    
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: 'Log Out?',
      message: 'Are you sure you want to Log out?',
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
          console.log('OK clicked');
          window.localStorage.removeItem('SessionType');
		  window.localStorage.removeItem('SessionUser');
          window.location.reload();
          }
        }
      ]
    });
    confirm.present();
  }
}
