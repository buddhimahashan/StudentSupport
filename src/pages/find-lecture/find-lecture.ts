import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the FindLecture page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-find-lecture',
  templateUrl: 'find-lecture.html',
})
export class FindLecture {

LectureDetails:any;
Subjects: any;
Years:any;
angfires:AngularFire;
lectureview:string;
YearView:string;
SemesterView:string;
SubjectView:string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public navParams: NavParams,public angfire: AngularFire,public alerCtrl: AlertController) {

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

  Find(){
if (this.Years == undefined || this.Years == '') {
      this.alertMessage("Warning!", "Please Select the Year");
    } else if (this.Subjects == undefined || this.Subjects == '') {
      this.alertMessage("Warning!", "Please Select the Subject");
    } else{
      this.presentLoading();
     this.LectureDetails = this.angfire.database.list('/Subjects', {
      query: {
        orderByChild: 'subject',
        equalTo: this.Subjects
      },
      preserveSnapshot: true
    }).subscribe(snapshots => {
      let UserDataArray = [];
      snapshots.forEach(snapshot => {
        UserDataArray.push(snapshot.val());
      });
      console.log(UserDataArray.length);
      if (UserDataArray.length > 0) {
        this.lectureview = UserDataArray[0].lecture;
        this.YearView = UserDataArray[0].year;
        this.SemesterView = UserDataArray[0].semester;
        this.SubjectView=UserDataArray[0].subject;
        

      } else {
       console.log("Not Available");
        

      }
       console.log(this.lectureview);
    })
  
    }
  }
}
