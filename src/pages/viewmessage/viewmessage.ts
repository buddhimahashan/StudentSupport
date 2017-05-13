import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { Message } from '../message/message';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire) {
      this.MyMessages = angfire.database.list('/Messages', {
     })

    this.viewMessages();
  }
  viewMessages() {
    this.from = window.localStorage.getItem('From');
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
  
}
