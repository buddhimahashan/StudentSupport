import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'


/**
 * Generated class for the HomeStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-student',
  templateUrl: 'home-student.html',

})
export class HomeStudent {


  TimeSlots: any;
  Years: any;
  Semester: any;
  Subjects: any;
  Reasons: any;
  Description: any;

  TSlots: string;
  lName: string;
  Responce: string = 'Pending';
  private items: string[];
  Lecture: string = "";
  LectureName: string = '';
  username: string;


  constructor(public navCtrl: NavController, public alerCtrl: AlertController, public navParams: NavParams, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public angfire: AngularFire) {
    this.username=window.localStorage.getItem('SessionName');
    this.initializeItems();
    this.items = [];
  }

  checkdescription() {
    if (this.Description == undefined || this.Description == '') {
      this.Description = '';
    }
  }

  SendAppointment() {
    let confirm = this.alerCtrl.create({
      title: 'Send Appointment?',
      message: 'Are you sure you want to send this appointment?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.insertRequest();
            this.alertMessage("Succesful!", "Your Appointment Succesfully Send to the Lecture");
            console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  insertRequest() {

    this.checkdescription();
    
    console.log(this.username);

    this.angfire.database.list('/StudentAppointment').push({
      lecture: this.LectureName,
      date: this.event.month,
      time: this.TimeSlots,
      year: this.Years,
      semester: this.Semester,
      subject: this.Subjects,
      reason: this.Reasons,
      description: this.Description,
      responce: this.Responce,
      user: this.username,
    });
  }

  clear() {
    this.items = [];
    this.TimeSlots = [];
    this.Years = [];
    this.Semester = [];
    this.Subjects = [];
    this.Reasons = [];
    this.Description = [];
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }

  alertMessage(title, message) {
    let alert = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }

  initializeItems() {
    this.items = [
      'Dr.(Mrs) Pradeepa Samarasinghe',
      'Ms. Dinuka Wijendra',
      'Ms. Yashodhya Wijesinghe',
      'Ms. Dakshi Tharanga',
      'Dr. Kosala Yapa Bandara',
      'Ms. Dulani Perera',
      'Ms. Namalie  Walgampaya',
      'Mr. Jagath Wickramarathne',
      'Mr. Isuru Kumarasiri '
    ]
  }

  getItems() {

    console.log('The search button has been clicked...');

    this.initializeItems();
    let val = this.Lecture
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.items = [];
    }
  }

  setitem(item) {
    this.LectureName = item;
    this.items = [];
  }

  public event = {

    month: '2017-01-01',
    timeStarts: '08:30'
  }


  CheckAppointmentDetails() {
    this.TSlots = this.TimeSlots;

    if (this.LectureName == undefined || this.LectureName == '') {
      this.alertMessage("Warning!", "Please Select the Lecture");
    } else if (this.TSlots == undefined || this.TSlots == '') {
      this.alertMessage("Warning!", "Please Select the Time");
    } else {
      console.log(this.LectureName);
      console.log(this.TSlots);
    }
  }

  CheckAvailabilityDetails() {
    this.TSlots = this.TimeSlots;

    if (this.Years == undefined || this.Years == '') {
      this.alertMessage("Warning!", "Please Select Appointment Details");
    } else if (this.Semester == undefined || this.Semester == '') {
      this.alertMessage("Warning!", "Please Select Appointment Details");
    } else if (this.Subjects == undefined || this.Subjects == '') {
      this.alertMessage("Warning!", "Please Select Appointment Details");
    } else if (this.Reasons == undefined || this.Reasons == '') {
      this.alertMessage("Warning!", "Please Select Appointment Details");
    } else {
      
      console.log(this.LectureName);
      console.log(this.event.month);
      console.log(this.TimeSlots);
      console.log(this.Years);
      console.log(this.Semester);
      console.log(this.Subjects);
      console.log(this.Reasons);
      console.log(this.Description);
      console.log(this.Responce);
      this.username=window.localStorage.getItem('SessionName');
      console.log(this.username);
    }
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Request Confirmation',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Send Request',
          icon: 'send',
          handler: () => {
            this.CheckAvailabilityDetails();
            this.SendAppointment();
            
            //this.insertRequest();''
            //  this.clear();
            this.navCtrl.push(HomeStudent);
            console.log('Send Request clicked');
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          handler: () => {
            //  this.clear();
            this.navCtrl.push(HomeStudent);
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

}




