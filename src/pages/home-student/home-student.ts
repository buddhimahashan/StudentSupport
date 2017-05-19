import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FindLecture } from '../find-lecture/find-lecture';
import firebase from 'firebase';



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

  i: number;
  freeSlotArray = [];

  TSlots: string;
  lName: string;
  Responce: string = 'Pending';
  private items: string[];
  Lecture: string = "";
  LectureName: string = '';
  username: string;
  TodayDate: string;
  btnDisable: boolean = true;
  staffSlots: FirebaseListObservable<any>;
  userId: any = "IT00000000";
  day: any;
  slot: any = "slot_1";
  status: any;
  id: any;
  Time: string;


  UserDataList = [];
  StaffSlotsList = [];
  UserData: any;
  LectureUserName: any;
  lectureusername: string;
  WeekAfterDay: string;
  inputs = [];

  SlotData = [];
  slotab: string;

  constructor(public navCtrl: NavController, public alerCtrl: AlertController, public navParams: NavParams, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public angfire: AngularFire) {
    this.username = window.localStorage.getItem('SessionName');
    this.initializeItems();
    this.items = [];

    function addDays(theDate, days) {
      return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    var newDate = addDays(new Date(), 7);

    this.TodayDate = new Date().toISOString();
    this.WeekAfterDay = newDate.toISOString();
    console.log(this.WeekAfterDay);

    this.UserData = this.angfire.database.list('/UserNameMaping', {

      query: {
        orderByChild: 'usertype',
        equalTo: 'Staff'
      },
      preserveSnapshot: true

    }).subscribe(snapshots => {
      let UserDataArray = [];
      snapshots.forEach(snapshot => {
        UserDataArray.push(snapshot.val());
      });


      UserDataArray.forEach(element => {
        this.UserDataList.push(element.name);
      });
    })




  }

  FindLecture() {
    this.presentLoading();

    this.navCtrl.push(FindLecture);
  }

  getday(date) {
    var d = new Date(date);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    console.log(d.getDay());
    var n = weekday[d.getDay()];
    this.day = n;
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
            this.presentLoading();
            this.alertMessage("Succesful!", "Your Appointment Succesfully Send to the Lecture");
            this.navCtrl.push(HomeStudent);
            console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  FindUserName() {
    console.log(this.LectureName);
    this.LectureUserName = this.angfire.database.list('/UserNameMaping', {
      query: {
        orderByChild: 'name',
        equalTo: this.LectureName
      },
      preserveSnapshot: true
    }).subscribe(snapshots => {
      let UserDataArray = [];
      snapshots.forEach(snapshot => {
        UserDataArray.push(snapshot.val());
      });
      console.log(UserDataArray.length);
      if (UserDataArray.length > 0) {
        this.lectureusername = UserDataArray[0].user;


      } else {
        this.lectureusername = "";

      }
    })
  }

  FindSlotName() {

    firebase.database().ref('staffSlot/' + this.lectureusername + '/' + this.day + '/' + this.TimeSlots + '/slotName').on('value', data => {
      console.log(data.val())
      this.Time = data.val();

    });
  }

  insertRequest() {

    this.checkdescription();

    console.log(this.username);

    this.angfire.database.list('/StudentAppointment').push({
      lecture: this.LectureName,
      date: this.event.month.split("T")[0],
      time: this.Time,
      year: this.Years,
      semester: this.Semester,
      subject: this.Subjects,
      reason: this.Reasons,
      description: this.Description,
      responce: this.Responce,
      user: this.username,
      lectureusername: this.lectureusername,
      studentname: window.localStorage.getItem('SessionFullName')
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
  AvailableSlots() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Not Available');
    alert.setMessage('Your lecture not available at selected time.You can make an appointment for following time slots');

    for (let i = 0; i < this.SlotData.length; i++) {



      alert.addInput({
        value: this.SlotData[i],
        type: 'radio',
        label: this.SlotData[i]
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.Time = data;
        this.btnDisable = false;
        console.log("If Part " + this.Time);

        if (this.Time == "09.00 - 09.30") {
          this.TimeSlots = "slot_1";
        } else if (this.Time == "09.30 - 10.00") {
          this.TimeSlots = "slot_2";
        } else if (this.Time == "10.00 - 10.30") {
          this.TimeSlots = "slot_3";
        } else if (this.Time == "10.30 - 11.00") {
          this.TimeSlots = "slot_4"
        } else if (this.Time == "11.00 - 11.30") {
          this.TimeSlots = "slot_5"
        } else if (this.Time == "11.30 - 12.00") {
          this.TimeSlots = "slot_6"
        } else if (this.Time == "12.00 - 12.30") {
          this.TimeSlots = "slot_7"
        } else if (this.Time == "12.30 - 13.00") {
          this.TimeSlots = "slot_8"
        } else if (this.Time == "13.00 - 13.30") {
          this.TimeSlots = "slot_9"
        } else if (this.Time == "13.30 - 14.00") {
          this.TimeSlots = "slot_10"
        } else if (this.Time == "14.00 - 14.30") {
          this.TimeSlots = "slot_11"
        } else if (this.Time == "14.30 - 15.00") {
          this.TimeSlots = "slot_12"
        } else if (this.Time == "15.00 - 15.30") {
          this.TimeSlots = "slot_13"
        } else if (this.Time == "15.30 - 16.00") {
          this.TimeSlots = "slot_14"
        } else if (this.Time == "16.00 - 16.30") {
          this.TimeSlots = "slot_15"
        } else if (this.Time == "16.30 - 17.00") {
          this.TimeSlots = "slot_16"
        } else if (this.Time == "17.00 - 17.30") {
          this.TimeSlots = "slot_17"
        } else if (this.Time == "17.30 - 18.00") {
          this.TimeSlots = "slot_18"
        } else if (this.Time == "18.00 - 18.30") {
          this.TimeSlots = "slot_19"
        } else if (this.Time == "18.30 - 19.00") {
          this.TimeSlots = "slot_20"
        }

      }
    });

    alert.present()

  }

  initializeItems() {

    this.items = this.UserDataList

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
    this.FindUserName();
  }

  public event = {

    month: new Date().toISOString(),
    timeStarts: '08:30'
  }


  CheckAppointmentDetails() {
    this.TSlots = this.TimeSlots;

    if (this.LectureName == undefined || this.LectureName == '') {
      this.alertMessage("Warning!", "Please Select the Lecture");
    } else if (this.TSlots == undefined || this.TSlots == '') {
      this.alertMessage("Warning!", "Please Select the Time");
    } else if (this.event.month < this.TodayDate) {
      console.log(this.event.month);
      console.log(this.TodayDate);
      console.log(new Date());
      this.alertMessage("Warning!", "You can't make appointment for past dates");
    } else if (this.event.month > this.WeekAfterDay) {
      this.alertMessage("Warning!", "You can only make appointments with in a week");
    }
    else {
      this.presentLoading();

      console.log(this.LectureName);
      console.log(this.TimeSlots);
      console.log(this.event.month.split("T")[0]);
      this.getday(this.event.month);
      console.log(this.day);
      console.log('staffSlot/' + this.lectureusername + '/' + this.day + '/' + this.TimeSlots + '/status');

      firebase.database().ref('staffSlot/' + this.lectureusername + '/' + this.day + '/' + this.TimeSlots + '/status').on('value', data => {
        console.log(data.val())

        if (data.val() == false) {

          firebase.database().ref('staffSlot/' + this.lectureusername + '/' + this.day).on('value', data => {
            

            if ((data.val()['slot_1']['status']) == true) {
              this.SlotData.push(data.val()['slot_1']['slotName'])
            } if (data.val()['slot_2']['status'] == true) {
              this.SlotData.push(data.val()['slot_2']['slotName'])
            } if (data.val()['slot_3']['status'] == true) {
              this.SlotData.push(data.val()['slot_3']['slotName'])
            } if (data.val()['slot_4']['status'] == true) {
              this.SlotData.push(data.val()['slot_4']['slotName'])
            } if (data.val()['slot_5']['status'] == true) {
              this.SlotData.push(data.val()['slot_5']['slotName'])
            } if (data.val()['slot_6']['status'] == true) {
              this.SlotData.push(data.val()['slot_6']['slotName'])
            } if (data.val()['slot_7']['status'] == true) {
              this.SlotData.push(data.val()['slot_7']['slotName'])
            } if (data.val()['slot_8']['status'] == true) {
              this.SlotData.push(data.val()['slot_8']['slotName'])
            } if (data.val()['slot_9']['status'] == true) {
              this.SlotData.push(data.val()['slot_9']['slotName'])
            } if (data.val()['slot_10']['status'] == true) {
              this.SlotData.push(data.val()['slot_10']['slotName'])
            } if (data.val()['slot_11']['status'] == true) {
              this.SlotData.push(data.val()['slot_11']['slotName'])
            } if (data.val()['slot_12']['status'] == true) {
              this.SlotData.push(data.val()['slot_12']['slotName'])
            } if (data.val()['slot_13']['status'] == true) {
              this.SlotData.push(data.val()['slot_13']['slotName'])
            } if (data.val()['slot_14']['status'] == true) {
              this.SlotData.push(data.val()['slot_14']['slotName'])
            } if (data.val()['slot_15']['status'] == true) {
              this.SlotData.push(data.val()['slot_15']['slotName'])
            } if (data.val()['slot_16']['status'] == true) {
              this.SlotData.push(data.val()['slot_16']['slotName'])
            } if (data.val()['slot_17']['status'] == true) {
              this.SlotData.push(data.val()['slot_17']['slotName'])
            } if (data.val()['slot_18']['status'] == true) {
              this.SlotData.push(data.val()['slot_18']['slotName'])
            } if (data.val()['slot_19']['status'] == true) {
              this.SlotData.push(data.val()['slot_19']['slotName'])
            } if (data.val()['slot_20']['status'] == true) {
              this.SlotData.push(data.val()['slot_20']['slotName'])
            }

            console.log(this.SlotData.length)
            for (let i = 0; i < this.SlotData.length; i++) {
              console.log(this.SlotData[i])
            }
            this.AvailableSlots();

          });


        }
        else {
          this.alertMessage("Available", "Your Lecture Available at selected time. You can Make your Appointment");
          this.FindSlotName();
          this.btnDisable = false;
          console.log("Else Part " + this.Time);


        }
      });
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
      this.SendAppointment();
      console.log(this.LectureName);
      console.log(this.event.month);
      console.log(this.TimeSlots);
      console.log(this.Years);
      console.log(this.Semester);
      console.log(this.Subjects);
      console.log(this.Reasons);
      console.log(this.Description);
      console.log(this.Responce);
      this.username = window.localStorage.getItem('SessionName');
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


            //this.insertRequest();''
            //  this.clear();

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




