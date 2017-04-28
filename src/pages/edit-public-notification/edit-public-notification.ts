import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { AlertController } from 'ionic-angular';



/**
 * Generated class for the EditPublicNotification page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-public-notification',
  templateUrl: 'edit-public-notification.html',
})
export class EditPublicNotification {

  MyPublicNotices: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,public alertCtrl: AlertController) {
    this.MyPublicNotices = angfire.database.list('/Public_Notices', {
      query: {
        orderByChild: 'User',
        equalTo:  window.localStorage.getItem('SessionName'),
      }
  })

}

deleteNotice(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
        this.MyPublicNotices.remove(id).then(res=>{
        });
          
         resolve(true);
      });
   }

    deleteNoticeConfirm(id) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Notice?',
      message: 'Are you sure you want to delete this Notice?',
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
            this.deleteNotice(id);
                       console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
