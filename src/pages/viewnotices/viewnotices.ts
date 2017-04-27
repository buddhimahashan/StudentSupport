import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Viewnotices page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewnotices',
  templateUrl: 'viewnotices.html',
})
export class Viewnotices {
  year: string;
  date: string;
  title: string;
  notice: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.viewnotice();
  }


  viewnotice() {
    this.year = window.localStorage.getItem('Noticeyear');
    this.title = window.localStorage.getItem('Noticetitle');
    this.date = window.localStorage.getItem('NoticeDate');
    this.notice = window.localStorage.getItem('NoticeDescription');

  }
}
