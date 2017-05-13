import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Newmessage } from '../newmessage/newmessage';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Viewmessage } from '../viewmessage/viewmessage';

/**
 * Generated class for the Message page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class Message {

  InboxMessageData: FirebaseListObservable<any>;
  SentMessageData: FirebaseListObservable<any>;
  from:string;
  Title:string;
  Message:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire) {

    this.InboxMessageData = this.angfire.database.list('/Messages', {
      query: {
        orderByChild: 'To',
        equalTo: window.localStorage.getItem('SessionName')
      },})

       this.SentMessageData = this.angfire.database.list('/Messages', {
      query: {
        orderByChild: 'From',
        equalTo: window.localStorage.getItem('SessionName'),
      },})


  }

   OpenNewMessage(){

    this.navCtrl.push(Newmessage);
  }

  SetMessageDetails(fromData, titleData, messageData, messageKey) {
    this.navCtrl.push(Viewmessage);
    this.from = fromData;
    this.Title = titleData;
    this.Message = messageData;
    window.localStorage.setItem('From', this.from);
    window.localStorage.setItem('Title', this.Title);
    window.localStorage.setItem('Message', this.Message);
    window.localStorage.setItem('MessageKey', messageKey);
    
}
 
}
