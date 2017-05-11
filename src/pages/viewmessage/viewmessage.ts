import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  from:string;
  Title:string;
  Message:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewMessages();
  }
  viewMessages() {
    this.from = window.localStorage.getItem('From');
    this.Title = window.localStorage.getItem('Title');
    this.Message = window.localStorage.getItem('Message');
  }
  
}
