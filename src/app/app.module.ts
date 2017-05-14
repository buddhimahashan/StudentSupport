import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Newnotification} from '../pages/newnotification/newnotification';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomeStaff } from '../pages/home-staff/home-staff';
import { HomeStudent } from '../pages/home-student/home-student';
import { NotificationStaff } from '../pages/notification-staff/notification-staff';
import { NotificationStudent } from '../pages/notification-student/notification-student';
import { Profile } from '../pages/profile/profile';
import { Requests} from '../pages/requests/requests';
import { Viewnotices } from '../pages/viewnotices/viewnotices';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Newmessage } from '../pages/newmessage/newmessage';
import { AcceptedNotification } from '../pages/accepted-notification/accepted-notification';
import { EditPublicNotification } from '../pages/edit-public-notification/edit-public-notification';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { Message } from '../pages/message/message';
import { Viewmessage } from '../pages/viewmessage/viewmessage';
import { Changepassword } from '../pages/changepassword/changepassword';

const config = {
   apiKey: "AIzaSyCle6OXT0qMaWzaaG6z_it9KsZC-VNz6lI",
   authDomain: "pdmstudentassistant-27eaa.firebaseapp.com",
   databaseURL: "https://pdmstudentassistant-27eaa.firebaseio.com",
   projectId: "pdmstudentassistant-27eaa",
   storageBucket: "pdmstudentassistant-27eaa.appspot.com",
   messagingSenderId: "704888872666"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Login,
    HomeStaff,
    HomeStudent,
    NotificationStaff,
    NotificationStudent,
    Profile,
    TabsPage,
    Newnotification,
    Requests,
    Viewnotices,
    ResetPassword,
    AcceptedNotification,
    EditPublicNotification,
    Newmessage,
    Message,
    Viewmessage,
    Changepassword


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Login,
    HomeStaff,
    HomeStudent,
    NotificationStaff,
    NotificationStudent,
    Profile,
    TabsPage,
    Newnotification,
    Requests,
    Viewnotices,
    ResetPassword,
    AcceptedNotification,
    EditPublicNotification,
    Newmessage,
    Message,
    Viewmessage,
    Changepassword


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
