import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { AlertController } from 'ionic-angular';
import { EditPublicNotification } from '../edit-public-notification/edit-public-notification';


/**
 * Generated class for the Newnotification page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-newnotification',
  templateUrl: 'newnotification.html',
})
export class Newnotification {

  firelist: FirebaseListObservable<any>;
  Notice: any;
  Years: any;
  Date: String = new Date().toISOString();
  Description: any;
  NotificationData: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,
    public alertCtrl: AlertController) {

      console.log(this.event.month);
      
      this.NotificationData = this.angfire.database.list('/Public_Notices', {
                query: {
                   
                },
               
            })
            
            this.NotificationData.subscribe(data => {
              if (data.length > 0) {
                 data.forEach(element => {
                   if(element.date < this.event.month){
                  this.deleteMessage(element.$key);
                   //console.log(element.$key)
                }
                });
              }
            })



  }
  alertMessage(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present()
  }

  Batch

  SubmitData() {
    if (this.Years == undefined || this.Years == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else if (this.Notice == undefined || this.Notice == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else if (this.Date == undefined || this.Date == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else if (this.event.month > this.Date) {
      this.alertMessage("Warning!", "You can't make notice for past dates");
    }else if (this.Batch == undefined || this.Batch == '') {
      this.alertMessage("Warning!", "Check your notice details");
    } else {
      if (this.Description == undefined || this.Description == '') {
        this.Description = '';
        this.MakeAppointment();
        
      }
      else{
        this.MakeAppointment();
        
      }
    }


    console.log(this.Notice);
    console.log(this.Years);
    console.log(this.Date);
    console.log(this.Description);
    this.navCtrl.push(Newnotification);
  }

  MakeAppointment() {
    let confirm = this.alertCtrl.create({
      title: 'Add Notice?',
      message: 'Are you sure you want to publish this Notice?',
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
            this.angfire.database.list('/Public_Notices').push({
              notification: this.Notice,
              years: this.Years,
              batch: this.Batch,
              date: this.Date,
              dateView:this.Date.split("T")[0],
              Description: this.Description,
              User :  window.localStorage.getItem('SessionName'),
            });
            console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  EditPage(){
    this.navCtrl.push(EditPublicNotification);

  }


 public event = {

    month: new Date().toISOString(),
    
  }

 
  deleteMessage(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
        this.NotificationData.remove(id).then(res=>{
        });
          
         resolve(true);
      });
   }


  
}
