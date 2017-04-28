import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ResetPassword } from '../reset-password/reset-password';
import { AlertController } from 'ionic-angular';
import {FirebaseListObservable,AngularFire} from 'angularfire2';
//import { Profile } from '../profile/profile';
/*
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {

  firelist : FirebaseListObservable <any>; 

  UserType: any;
  UserName: any;
  UserPassword: any;

  uname: string;
  password: string;
  utype: string;

  UserData:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public angfire : AngularFire) {
  }

  alertMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Login Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  SetUserDetails() {

    this.uname = this.UserName;
    this.password = this.UserPassword;
    this.utype = this.UserType;

    if (this.uname == undefined || this.uname == '') {
      this.alertMessage("User Name cannot be empty");
    } else if (this.password == undefined || this.password == '') {
      this.alertMessage("Password cannot be empty");
    } else if (this.utype == undefined || this.utype == '') {
      this.alertMessage("Select User Type");
    } 
    else {
      console.log(this.UserName);
      console.log(this.UserPassword);
      console.log(this.UserType);

      this.UserData = this.angfire.database.list('/login', 
        { query: 
          {orderByChild: 'uname',
          equalTo: this.uname
        }, 
        preserveSnapshot: true}).subscribe(snapshots=>{
          let UserDataArray = [];
          snapshots.forEach(snapshot => {
          UserDataArray.push(snapshot.val());
        });

      if(UserDataArray.length > 0){

         if(this.password == UserDataArray[0].password){

              if(this.utype == UserDataArray[0].type){
                window.localStorage.setItem('SessionName', this.uname);
                window.localStorage.setItem('SessionPassword', this.password);
                window.localStorage.setItem('SessionType', this.utype);
                this.navCtrl.push(TabsPage);
              } 
              else{
                this.alertMessage("Invalide User Type") ;
              }
        }
          else{
            this.alertMessage("Invalide Password") ;
          }
          
      } 
      else{

          console.log("Login Else Part");
        
         if(this.uname !="" && this.uname != undefined ){
             this.UserData = this.angfire.database.list('/MainUsers', 
            { query: 
              {orderByChild: 'uname',
               equalTo: this.uname
            }, 
            preserveSnapshot: true
            }).subscribe(snapshots=>{
	      	    let UserDataArray = [];
	    	      snapshots.forEach(snapshot => {
	    	      UserDataArray.push(snapshot.val());
      	  	});
          
            if(UserDataArray.length > 0){
              if(this.password == UserDataArray[0].password){
                if(this.utype == UserDataArray[0].type){
                  window.localStorage.setItem('SessionName', this.uname);
                  window.localStorage.setItem('SessionPassword', this.password);
                  window.localStorage.setItem('SessionType', this.utype);

                  this.navCtrl.push(ResetPassword);
                  //this.doPrompt();
              } 
              else{
                this.alertMessage("Invalide User Type") ;
              }
               
            } 
            else{
                this.alertMessage("Invalide First Time Login Password") ;
            }
            
          }
          else{
              console.log("Login Error Else Part");
              this.uname="";
              window.localStorage.setItem('SessionName', "");
              window.localStorage.setItem('SessionPassword', "");
              window.localStorage.setItem('SessionType', "");

               this.alertMessage("Invalide User") ;
               
           }
	      })
    	}
         
      }
    })
            
    }

  }
  /*
 doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Change your Password",
      inputs: [
        {
          name: 'oldpassword',
          placeholder: 'Old Password'
        },
        {
        name: 'newpassword',
        placeholder: 'New Password'
      },
      {
        name: 're_enterpassword',
        placeholder: 'Re-enter New Password '
      },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {


              console.log(window.localStorage.getItem('SessionPassword'));
              console.log(data.oldpassword);
              console.log(data.newpassword);
              console.log(data.re_enterpassword);

              if(window.localStorage.getItem('SessionPassword')==data.oldpassword){

                if(data.newpassword == data.re_enterpassword){

                   this.angfire.database.list('/login').push({
                   uname: window.localStorage.getItem('SessionName'),
                   password: data.newpassword,
                   type: window.localStorage.getItem('SessionType'),
                });
                window.localStorage.setItem('SessionPassword', data.newpassword);
                this.navCtrl.push(TabsPage);
                }
                else{
                    this.alertMessage("New Password is Not Matched");
                }
              }
              else{
                this.alertMessage("Old Password is Incorrect");
              }
             console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  } */
 
}