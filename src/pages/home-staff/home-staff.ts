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
  
  slot_1 : boolean=false;
  slot_2 : boolean=false;
  slot_3 : boolean=false;
  slot_4 : boolean=false;
  slot_5 : boolean=false;
  slot_6 : boolean=false;
  slot_7 : boolean=false;
  slot_8 : boolean=false;
  slot_9 : boolean=false;
  slot_10 : boolean=false;
  slot_11 : boolean=false;
  slot_12 : boolean=false;
  slot_13 : boolean=false;
  slot_14 : boolean=false;
  slot_15 : boolean=false;
  slot_16 : boolean=false;
  slot_17 : boolean=false;
  slot_18 : boolean=false;
  slot_19 : boolean=false;
  slot_20 : boolean=false;

  slot_1_check : boolean=true;

  slotList : FirebaseListObservable <any>;
  day: any;
  userId: any = window.localStorage.getItem('SessionName');
  testval : string ="hello";

  btnDisable: boolean=true;



  onChange(value) {
    this.presentLoading();
    this.btnDisable=false;
 
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_1'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_1 = data.val();
      else
        this.slot_1=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_2'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_2 = data.val();
      else
        this.slot_2=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_3'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_3 = data.val();
      else
        this.slot_3=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_4'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_4 = data.val();
      else
        this.slot_4=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_5'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_5 = data.val();
      else
        this.slot_5=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_6'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_6 = data.val();
      else
        this.slot_6=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_7'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_7 = data.val();
      else
        this.slot_7=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_8'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_8 = data.val();
      else
        this.slot_8=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_9'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_9 = data.val();
      else
        this.slot_9=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_10'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_10 = data.val();
      else
        this.slot_10=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_11'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_11 = data.val();
      else
        this.slot_11=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_12'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_12 = data.val();
      else
        this.slot_12=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_13'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_13 = data.val();
      else
        this.slot_13=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_14'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_14 = data.val();
      else
        this.slot_14=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_15'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_15 = data.val();
      else
        this.slot_15=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_16'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_16 = data.val();
      else
        this.slot_16=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_17'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_17 = data.val();
      else
        this.slot_17=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_18'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_18 = data.val();
      else
        this.slot_18=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_19'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_19 = data.val();
      else
        this.slot_19=false; 
      });
      firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_20'+'/status').on('value', data => {
      if(data.val()==true)
        this.slot_20 = data.val();
      else
        this.slot_20=false; 
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
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_17').set({
                status: this.slot_17       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_18').set({
                status: this.slot_18       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_19').set({
                status: this.slot_19       
    });
    firebase.database().ref('staffSlot/'+this.userId+'/'+this.day +'/slot_20').set({
                status: this.slot_20       
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
    this.alertMessage("success", "updated slot changes")
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
      duration: 1000,
      dismissOnPageChange: true
    }).present();
  }


  Open(){
    this.navCtrl.push(Newnotification);
  }

}
