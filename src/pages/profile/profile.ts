import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { AlertController } from 'ionic-angular';
import { Changepassword } from '../changepassword/changepassword';
//import { TabsPage } from '../tabs/tabs';

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
  firelistMapping: FirebaseListObservable<any>;

 buttonDissabled : boolean = true;

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
  UserProfileType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController, public angfire: AngularFire) {
    this.UserProfileName = (window.localStorage.getItem('SessionName'));
    this.UserProfileType = window.localStorage.getItem('SessionType');
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

        this.fname = UserDataArray[0].fname;
        this.lname = UserDataArray[0].lname;
        this.bdate = UserDataArray[0].bdate;
        this.email = UserDataArray[0].email;
        this.contact = UserDataArray[0].contact;

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

   alertAboutMessage() {
    let alert = this.alertCtrl.create({
      title: 'About',
      subTitle: '<h4>SLIIT Student Assistant</h4><p>This application was developed and published partial fulfillment of mobile application development project of 3rd year students at Sri Lanka Institute of Information Technology (SLIIT) 2017.</p><p>All right reserved.</p><p>Developers:</p><p>•Buddhima Hashan</p><p>•Yoshani Kavindya</p><p>•Udam Arosha</p><p>•Mathisha Kaluaratchi</p><br><p>Version: 1.0.0.0</p>',
      buttons: ['OK']
    });
    alert.present();
  }

  alertMessageNotification(message) {
    let alert = this.alertCtrl.create({
      title: 'Notification',
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
          text: 'Change Password',
          icon: 'about',
          handler: () => {
            console.log('Change Password');
            this.navCtrl.push(Changepassword);
          }
        },

        {
          text: 'About',
          icon: 'about',
          handler: () => {
            this.alertAboutMessage();
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
            window.localStorage.setItem('LoginFlag', "false");
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
                    usertype: window.localStorage.getItem('SessionType'),
                    fname: this.fname,
                    lname: this.lname,
                    bdate: this.bdate,
                    email: this.email,
                    contact: this.contact,
                });

                this.firelistMapping = this.angfire.database.list('/UserNameMaping', {
                    query: {
                        orderByChild: 'user',
                        equalTo: window.localStorage.getItem('SessionName'),
                    }
                })

                this.firelistMapping.subscribe(data => {

                    console.log(data.length)

                    if (data.length > 0) {

                        this.firelistMapping.update(data[0].$key, {
                            user: window.localStorage.getItem('SessionName'),
                            usertype: window.localStorage.getItem('SessionType'),
                            name: this.fname + " " + this.lname,

                        });
                        console.log(this.fname + " " + this.lname)
                        //window.location.reload();
                        this.navCtrl.push(Profile);
                        this.alertMessageNotification("Your Profile Updated");


                    } else {

                        this.angfire.database.list('/UserNameMaping').push({
                            user: window.localStorage.getItem('SessionName'),
                            usertype: window.localStorage.getItem('SessionType'),
                            name: this.fname + " " + this.lname
                        })


                        console.log(this.fname + " " + this.lname)
                        //window.location.reload();

                        this.alertMessageNotification("Your Profile Updated");
                        this.navCtrl.push(Profile);
                        //this.navCtrl.push(TabsPage);
                    }

                })

            } else {

                this.angfire.database.list('/UserProfiles').push({
                    user: window.localStorage.getItem('SessionName'),
                    usertype: window.localStorage.getItem('SessionType'),
                    fname: this.fname,
                    lname: this.lname,
                    bdate: this.bdate,
                    email: this.email,
                    contact: this.contact,

                })
                this.firelistMapping = this.angfire.database.list('/UserNameMaping', {
                    query: {
                        orderByChild: 'user',
                        equalTo: window.localStorage.getItem('SessionName'),
                    }
                })

                this.firelistMapping.subscribe(data => {

                    console.log(data.length)

                    if (data.length > 0) {

                        this.firelistMapping.update(data[0].$key, {
                            user: window.localStorage.getItem('SessionName'),
                            name: this.fname + " " + this.lname,

                        });
                        console.log(this.fname + " " + this.lname)

                        //window.location.reload();
                        this.navCtrl.push(Profile);
                        //this.alertMessageNotification("Your Profile Updated");

                    } else {

                        this.angfire.database.list('/UserNameMaping').push({
                            user: window.localStorage.getItem('SessionName'),
                            name: this.fname + " " + this.lname
                        })



                        //window.location.reload();
                        this.navCtrl.push(Profile);
                        //this.alertMessageNotification("Your Profile Updated");
                    }

                })
            }




        })




    }
}

enableItem(){
  console.log("Click enable")
    this.buttonDissabled=false;
}

}
