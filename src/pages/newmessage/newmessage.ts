import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { Message } from '../message/message';

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

  Insert1:string;
  Insert2:string;

 


  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, public alertCtrl: AlertController) {
   
   this.initializeItems();
   this.items = [];
   
   this.MessageUser =window.localStorage.getItem('MessageContact');
   
   
    console.log(window.localStorage.getItem('SessionType'));

    if (window.localStorage.getItem('SessionType') == "Student") {
      this.MessageUserType = "Staff";
    } else if (window.localStorage.getItem('SessionType') == "Staff") {
      this.MessageUserType = "Student";
    }


    this.UserData = this.angfire.database.list('/UserNameMaping', {

      query: {
        orderByChild: 'usertype',
        equalTo: this.MessageUserType,
      },
      preserveSnapshot: true

    }).subscribe(snapshots => {
      let UserDataArray = [];
      snapshots.forEach(snapshot => {
        UserDataArray.push(snapshot.val());
      });


      UserDataArray.forEach(element => {
        this.UserDataList.push(element.name);
      });
    })
   
   /* this.UserData = this.angfire.database.list('/login', {
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
 */
    console.log(this.UserDataList)


  }

   ConfirmingSend() {
   let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are You Sure You Want to Sent Message',
      buttons: [
        {
          text: 'OK',
          handler: () => {
              this.SendingMessage();
          }
        },
        
        {
          text: 'Cancel',
          handler: () => {
              
          }
        }
      ]
    });
    confirm.present();
  }

  alertMessage(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }

  InsertTable1(){
    this.angfire.database.list('/'+window.localStorage.getItem('SessionFullName')).push({
        To: this.UserName,
        From: window.localStorage.getItem('SessionFullName'),
        Title: this.Title,
        Message: this.Message
      }); 
      this.Insert1="Complete";
  }

  InsertTable2(){
     this.angfire.database.list('/'+this.UserName).push({
        To: this.UserName,
        From: window.localStorage.getItem('SessionFullName'),
        Title: this.Title,
        Message: this.Message
      });
       this.Insert2="Complete";
  }

  SendMessage() {

    if (this.Message == undefined || this.Message == '') {
      this.alertMessage("Warning!", "Check Message details");
    } else if (this.UserName == undefined || this.UserName == '') {
      this.alertMessage("Warning!", "Check User details");
    } else if (this.Title == undefined || this.Title == '') {
      this.alertMessage("Warning!", "Check User details");
    }  else {

      this. ConfirmingSend();
     
    }
 
    

  }

 SendingMessage(){
       this.MessageTable = "Messages"+window.localStorage.getItem('SessionName');
       console.log(this.UserName);

       this.Insert1 = "false";
       this.Insert2 = "false";
       if(this.Insert1 == "false" && this.Insert2=="false"){
            this.InsertTable1();
       }

if(this.Insert1 == "Complete" && this.Insert2=="false"){
            this.InsertTable2();
       }
      this.navCtrl.push(Message);
       //window.location.reload();
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
