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

  private items: string[];
  MessageUser: string = "";
  UserName: string = '';

  Message: any;
  Title: any;
  User: any;

  MessageTable : string;

 


  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, public alertCtrl: AlertController) {
   
   this.items = [];
   this.initializeItems();
   
   
    console.log(window.localStorage.getItem('SessionType'));

    if (window.localStorage.getItem('SessionType') == "Student") {
      this.MessageUserType = "Staff";
    } else if (window.localStorage.getItem('SessionType') == "Staff") {
      this.MessageUserType = "Student";
    }
    this.UserData = this.angfire.database.list('/login', {
      query: {
        orderByChild: 'type',
        equalTo: this.MessageUserType
      },
      preserveSnapshot: true
    }).subscribe(snapshots => {
      let UserDataArray = [];
      snapshots.forEach(snapshot => {
        UserDataArray.push(snapshot.val());
      });

      UserDataArray.forEach(element => {
        this.UserDataList.push(element.uname);
        
         
      });
    })

    console.log(this.UserDataList)


  }

  alertMessage(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }



  SendMessage() {

    if (this.Message == undefined || this.Message == '') {
      this.alertMessage("Warning!", "Check Message details");
    } else if (this.UserName == undefined || this.UserName == '') {
      this.alertMessage("Warning!", "Check User details");
    } else if (this.Title == undefined || this.Title == '') {
      this.alertMessage("Warning!", "Check User details");
    } else {

      this.MessageTable = "Messages"+window.localStorage.getItem('SessionName');


      this.angfire.database.list('/'+this.MessageTable).push({
        To: this.UserName,
        From: window.localStorage.getItem('SessionName'),
        Title: this.Title,
        Message: this.Message
      });
    }
 
     window.location.reload();

  }

  initializeItems() {
    this.items = this.UserDataList;
  }

  getItems() {

    console.log('The search button has been clicked...');

    this.initializeItems();
    let val = this.MessageUser
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.items = [];
    }
  }

  setitem(item) {
    this.UserName = item;
    this.items = [];
    this.MessageUser = "";
  }



}
