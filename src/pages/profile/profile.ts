import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
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

  UserProfileName: string;
  firelist: FirebaseListObservable<any>;
  fname: string;
  lname: string;
  bdate: string;
  email: string;
  contact: string;

  fnameView: string;
  lnameView: string;
  bdateView: string;
  emailView: string;
  contactView: string;

  UserData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController, public angfire: AngularFire) {
    this.UserProfileName = (window.localStorage.getItem('SessionName'));

    this.UserData = this.angfire.database.list('/UserProfiles', {
      query: {
        orderByChild: 'user',
        equalTo: this.UserProfileName
      },
      preserveSnapshot: true
    }).subscribe(snapshots => {
      let UserDataArray = [];
      snapshots.forEach(snapshot => {
        UserDataArray.push(snapshot.val());
      });

      if (UserDataArray.length > 0) {
        this.fnameView = UserDataArray[0].fname;
        this.lnameView = UserDataArray[0].lname;
        this.bdateView = UserDataArray[0].bdate;
        this.emailView = UserDataArray[0].email;
        this.contactView = UserDataArray[0].contact;

      } else {
        this.fnameView = "";
        this.lnameView = "";
        this.bdateView = "";
        this.emailView = "";
        this.contactView = "";

      }
    })


  }

  alertMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Login Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }



  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'More',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Settings',
          icon: 'settings',
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
            window.localStorage.setItem('LoginFlag', "false");
            console.log("Logout Clicked");
          }
        }
      ]
    });
    actionSheet.present();

  }

  logout() {
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

  AddDetails() {
    if (this.fname == "" || this.fname == undefined) {
      this.alertMessage("First Name cannot be Empty");
    } else if (this.lname == "" || this.lname == undefined) {
      this.alertMessage("Last Name cannot be Empty");
    } else if (this.bdate == "" || this.bdate == undefined) {
      this.alertMessage("Birthday cannot be Empty");
    } else if (this.email == "" || this.email == undefined) {
      this.alertMessage("Email cannot be Empty");
    } else if (this.contact == "" || this.contact == undefined) {
      this.alertMessage("Contact cannot be Empty");
    } else {

      this.firelist = this.angfire.database.list('/UserProfiles', {
        query: {
          orderByChild: 'user',
          equalTo: window.localStorage.getItem('SessionName'),
        }
      })



      this.firelist.subscribe(data => {

        if (data.length > 0) {

          this.firelist.update(data[0].$key, {
            user: window.localStorage.getItem('SessionName'),
            fname: this.fname,
            lname: this.lname,
            bdate: this.bdate,
            email: this.email,
            contact: this.contact,
          });

          window.location.reload();


        } else {

          this.angfire.database.list('/UserProfiles').push({
            user: window.localStorage.getItem('SessionName'),
            fname: this.fname,
            lname: this.lname,
            bdate: this.bdate,
            email: this.email,
            contact: this.contact,
          })
          window.location.reload();
        }




      })




    }
  }


}
