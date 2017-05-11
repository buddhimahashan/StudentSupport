import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Newmessage } from '../newmessage/newmessage';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Generated class for the MessageStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-message-student',
  templateUrl: 'message-student.html',
})
export class MessageStudent {

  
  InboxMessageData: FirebaseListObservable<any>;
  SentMessageData: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire) {

    console.log(window.localStorage.getItem('SessionName'))

    this.InboxMessageData = this.angfire.database.list('/Messages', {
      query: {
        orderByChild: 'reciever',
        equalTo: window.localStorage.getItem('SessionName')
      },})

       this.SentMessageData = this.angfire.database.list('/Messages', {
      query: {
        orderByChild: 'User',
        equalTo: window.localStorage.getItem('SessionName')
      },})

      
  }

  OpenNewMessage(){

    this.navCtrl.push(Newmessage);
  }
 

}
