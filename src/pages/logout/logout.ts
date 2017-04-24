import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the Logout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class Logout {

   LogedOut(){
    window.localStorage.removeItem('SessionType');
    window.localStorage.removeItem('SessionUser');
    this.navCtrl.push(TabsPage);

  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 
}
