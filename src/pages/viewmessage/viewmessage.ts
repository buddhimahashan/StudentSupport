import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { Message } from '../message/message';
import { Newmessage } from '../newmessage/newmessage';
import { AlertController } from 'ionic-angular';
import {  ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the Viewmessage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-viewmessage',
  templateUrl: 'viewmessage.html',
})
export class Viewmessage {

  MyMessages:  FirebaseListObservable<any>;


  from:string;
  Title:string;
  Message:string;
  MessageTable : string;
  RejectMessage : boolean = false;
  ReplyMessage : boolean = false;
  RejectBlock : boolean = false;

  constructor(public actionsheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, 
  public angfire: AngularFire, public alertCtrl: AlertController) {

    this.viewMessages();

    console.log(window.localStorage.getItem('SessionType'))
    if(window.localStorage.getItem('SessionType') == "Staff" && window.localStorage.getItem('MessageInOut') == "InBox"){
        this.RejectMessage = true
    }

     if(window.localStorage.getItem('MessageInOut') == "InBox" && this.RejectBlock == false){
        this.ReplyMessage = true;
    }

  /*  this.MessageTable = "Messages"+window.localStorage.getItem('SessionFullName');
      this.MyMessages = angfire.database.list('/'+window.localStorage.getItem('SessionFullName'), {
     }) */

    
  }
  viewMessages() {
    this.from = window.localStorage.getItem('From');
    if(this.from == "SYSTEM MESSAGE"){
        this.RejectBlock = true;
    }
    this.Title = window.localStorage.getItem('Title');
    this.Message = window.localStorage.getItem('Message');
  }

  removeMessages(){

    this.deleteMessage(window.localStorage.getItem('MessageKey'));
    this.navCtrl.push(Message);

  }
  deleteMessage(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
        this.MyMessages.remove(id).then(res=>{
        });
          
         resolve(true);
      });
   }
  
  sendReject(){
    this.angfire.database.list('/'+window.localStorage.getItem('From')).push({
        To: window.localStorage.getItem('From'),
        From: "SYSTEM MESSAGE",
        Title: "Message Reject",
        Message: "Your Message Rejected by "+window.localStorage.getItem('SessionFullName'),
      });
  }

  Reply(){
    window.localStorage.setItem('MessageContact', this.from);
    this.navCtrl.push(Newmessage);
  }

  MenuConditions(){

    if( this.ReplyMessage == true &&  this.RejectMessage == true){
    this.openMenuAll();
  }else if( this.ReplyMessage == true &&  this.RejectMessage == false){
    this.openMenuNoReject();
  }else{
    this.openMenuDelete();
  }
  }

  openMenuAll() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Reply',
          icon: 'reply',
          handler: () => {
            console.log('Reply');
            this.Reply();
            
          }
        },

        {
          text: 'Reject',
          icon: 'reject',
          handler: () => {
            console.log('Reject');
            this.ConfirmingReject();
          }
        },

        {
          text: 'Delete',
          icon: 'delete',
          handler: () => {
            console.log("Delete");
            this. ConfirmingDelete();
          }
        }
      ]
    });
    actionSheet.present();

  }

  openMenuNoReject() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Reply',
          icon: 'reply',
          handler: () => {
            console.log('Reply');
            this.Reply();
            
          }
        },

        {
          text: 'Delete',
          icon: 'delete',
          handler: () => {
            console.log("Delete");
            this. ConfirmingDelete();
          }
        }
      ]
    });
    actionSheet.present();

  }

  openMenuDelete() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
       {
          text: 'Delete',
          icon: 'delete',
          handler: () => {
            console.log("Delete");
            this. ConfirmingDelete();
          }
        }
      ]
    });
    actionSheet.present();

  }

  ConfirmingDelete() {
   let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are You Sure You Want to Delete Message',
      buttons: [
        {
          text: 'OK',
          handler: () => {
              this.removeMessages();
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


  ConfirmingReject() {
   let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are You Sure You Want to Reject Message',
      buttons: [
        {
          text: 'OK',
          handler: () => {
              this.sendReject();
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
}
