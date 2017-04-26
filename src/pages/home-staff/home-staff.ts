import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {Newnotification} from '../newnotification/newnotification';
import {FirebaseListObservable,AngularFire} from 'angularfire2';
import firebase from 'firebase';


/**
 * Generated class for the HomeStaff page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-staff',
  templateUrl: 'home-staff.html',
})
export class HomeStaff {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alerCtrl: AlertController,public loadingCtrl: LoadingController,public angfire: AngularFire) {
  }
  
  slot_1 : boolean=true;
  slot_2 : boolean=false;
  slot_3 : boolean=false;
  slot_4 : boolean=false;
  slot_5 : boolean=false;
  slot_6 : boolean=false;
  slot_7 : boolean=false;
  slot_8 : boolean=false;
  slot_9 : boolean=false;
  slot_10 : boolean=true;
  slot_11 : boolean=false;
  slot_12 : boolean=false;
  slot_13 : boolean=false;
  slot_14 : boolean=false;
  slot_15 : boolean=false;
  slot_16 : boolean=false;

  slot_1_check : boolean=true;

  slotList : FirebaseListObservable <any>;
    day: any;
    userId: any = "IT00000000";


 // dayValue:String;
  onChange(value) {
    this.alertMessage("Warning", this.day)
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_1').on('value', function(snapshot) {
        //this.slot_1 = snapshot.val(); 
        this.alertMessage("Warning","value "+snapshot.val());
      });
  }


// object set data to firebase
  // firebase.database().ref('/staffSlot').set({

// this.angfire.database.object('staffSlot/'+this.userId+'/'+this.day +'/slot_2').set({
    //             status: this.slot_2       
    // }); 

  setSlot(e): void {
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_1').set({
                status: this.slot_1       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_2').set({
                status: this.slot_2       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_3').set({
                status: this.slot_3       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_4').set({
                status: this.slot_4       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_5').set({
                status: this.slot_5       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_6').set({
                status: this.slot_6       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_7').set({
                status: this.slot_7       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_8').set({
                status: this.slot_8       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_9').set({
                status: this.slot_9       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_10').set({
                status: this.slot_10       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_11').set({
                status: this.slot_11       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_12').set({
                status: this.slot_12       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_13').set({
                status: this.slot_13       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_14').set({
                status: this.slot_14       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_15').set({
                status: this.slot_15       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_16').set({
                status: this.slot_16       
    });

    // var slotSet = this.angfire.database().ref("staffSlot/");
    // if (this.slot_1 == true){
    //   // this.alertMessage("Warning", "check the slot")
    //       slotSet.set({
    //         day: this.dayValue,
    //         slot: {
    //             slotId: 'slot_1',
    //             status: this.slot_1
    //         }
    //       });
    //  }
  }
  
  alertMessage(title, message) {
    let alert = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()

  }
  presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }


  Open(){
    this.navCtrl.push(Newnotification);
  }

}
