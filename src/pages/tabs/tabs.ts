import { Component } from '@angular/core';

import { HomeStaff } from '../home-staff/home-staff';
import { NotificationStaff } from '../notification-staff/notification-staff';
import { MessageStaff } from '../message-staff/message-staff';
import { HomeStudent } from '../home-student/home-student';
import { NotificationStudent } from '../notification-student/notification-student';
import { MessageStudent } from '../message-student/message-student'
import { Profile } from '../profile/profile';
import { NavController} from 'ionic-angular';
import { Login } from '../login/login';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root ;
  tab2Root ;
  tab3Root ;
  tab4Root ;
  
  SelectTabs(){
    console.log(window.localStorage.getItem('SessionType'));
    if(window.localStorage.getItem('SessionType')=="Staff"){
         this.tab1Root = HomeStaff;
         this.tab2Root = NotificationStaff;
         this.tab3Root = MessageStaff;
         this.tab4Root = Profile;
    }else if(window.localStorage.getItem('SessionType')=="Student"){
         this.tab1Root = HomeStudent;
         this.tab2Root = NotificationStudent;
         this.tab3Root = MessageStudent;
         this.tab4Root = Profile;
    }else{
          this.navCtrl.push(Login);
    }
    
  }

 

 

  constructor(public navCtrl: NavController) {
      this.SelectTabs();
  }
}
