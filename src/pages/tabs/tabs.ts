import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';

//import { Login } from '../login/login';
//import { HomeStudent } from '../home-student/home-student';
import { HomeStaff } from '../home-staff/home-staff';
import { NotificationStaff } from '../notification-staff/notification-staff';
import { Profile } from '../profile/profile';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomeStaff;
  tab2Root = NotificationStaff;
  tab3Root = ContactPage;
  tab4Root = Profile;

  constructor() {

  }
}
