import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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

LectureDetails:FirebaseListObservable<any>;
Subjects: any;
angfires:AngularFire;

  constructor(public navCtrl: NavController, public navParams: NavParams,public angfire: AngularFire) {

     this.angfires = angfire;

  }

  Find(){
   // this.angfires = angfire;
    this.LectureDetails = this.angfires.database.list('/StudentAppointment', {
      query: {
        orderByChild: 'subject',
        equalTo: this.Subjects
      }
      
    })
    console.log(this.Subjects)
    console.log(this.LectureDetails)
    
  }

  
}
