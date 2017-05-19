import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ResetPassword } from '../reset-password/reset-password';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
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

    validUser:boolean = false;

    firelist: FirebaseListObservable<any>;
    firelistRemoveBlock: FirebaseListObservable<any>;

    LoginCount: number = 0;

    UserType: any;
    UserName: any;
    UserPassword: any;
    Flag: string;

    uname: string;
    password: string;
    utype: string;

    UserData: any;
    UserDataList = [];
    localloginflag: string = "false";

    UserDataFullName: any;
    deleteKey: string;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public angfire: AngularFire) {
    }

    alertMessage(message) {
        let alert = this.alertCtrl.create({
            title: 'Login Error!',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    alertMessageBlock(message) {
        let alert = this.alertCtrl.create({
            title: 'Account Information',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    alertMessageLoged(message) {
        let alert = this.alertCtrl.create({
            title: 'Notification',
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
        } else {
            console.log(this.UserName);
            console.log(this.UserPassword);
            console.log(this.UserType);

            this.UserData = this.angfire.database.list('/login', {
                query: {
                    orderByChild: 'uname',
                    equalTo: this.uname
                },
                preserveSnapshot: true
            }).subscribe(snapshots => {
                let UserDataArray = [];
                snapshots.forEach(snapshot => {
                    UserDataArray.push(snapshot.val());
                });

                if (UserDataArray.length > 0) {

                    if (this.password == UserDataArray[0].password) {

                        if (this.utype == UserDataArray[0].type) {
                            window.localStorage.setItem('SessionName', this.uname);
                            window.localStorage.setItem('SessionPassword', this.password);
                            window.localStorage.setItem('SessionType', this.utype);

                            this.UserDataFullName = this.angfire.database.list('/UserNameMaping', {

                                query: {
                                    orderByChild: 'user',
                                    equalTo: this.uname,
                                },
                                preserveSnapshot: true

                            }).subscribe(snapshots => {
                                let UserDataArray = [];
                                snapshots.forEach(snapshot => {
                                    UserDataArray.push(snapshot.val());
                                });


                                UserDataArray.forEach(element => {

                                    window.localStorage.setItem('SessionFullName', element.name);
                                    console.log(element.name);
                                });
                            })
                            this.alertMessageLoged("You are sucessfully loged in.");
                            this.navCtrl.push(TabsPage);
                        } else {
                            this.alertMessage("Invalide User Type");
                        }
                    } else {

                        this.LoginCount = this.LoginCount + 1;
                        if (this.LoginCount < 4) {
                            this.alertMessage("Invalide Password");
                        }

                        if (this.LoginCount > 3) {
                            console.log(this.uname)

                            this.firelistRemoveBlock = this.angfire.database.list('/login', {
                                query: {
                                    orderByChild: 'uname',
                                    equalTo: this.uname
                                }
                            })
                            this.firelistRemoveBlock.subscribe(data => {
                                console.log(data[0].$key)
                                this.deleteKey = data[0].$key;
                                console.log("Block " + this.deleteKey);
                                console.log(data[0].$key)
                                this.deleteMessage(this.deleteKey)
                            })

                            this.angfire.database.list('/MainUsers').push({
                                uname: UserDataArray[0].uname,
                                password: UserDataArray[0].password,
                                type: UserDataArray[0].type
                            })
                            
                            this.alertMessageBlock("Your Account has been blocked. Please Contact pdmstudentsupport@gmail.com")
                            //window.location.reload();
                            this.UserName="";
                            this.UserPassword="";
                            this.UserType="";
                        }
                    }

                } else {
                    if(this.LoginCount == 0 ){
                    this.alertMessage("Not Registered User");
                    console.log("Login Else Part");
                }
                }
            })

        }

    }


    SignUp() {

    this.uname = this.UserName;
    this.password = this.UserPassword;
    this.utype = this.UserType;
 

    if (this.uname == undefined || this.uname == '') {
        this.alertMessage("User Name cannot be empty");
    } else if (this.password == undefined || this.password == '') {
        this.alertMessage("Password cannot be empty");
    } else if (this.utype == undefined || this.utype == '') {
        this.alertMessage("Select User Type");
    } else {

       if (this.uname != "" && this.uname != undefined) {
            this.UserData = this.angfire.database.list('/MainUsers', {
                query: {
                    orderByChild: 'uname',
                    equalTo: this.uname
                },
                preserveSnapshot: true
            }).subscribe(snapshots => {
                let UserDataArray = [];
                snapshots.forEach(snapshot => {
                    UserDataArray.push(snapshot.val());
                    console.log(snapshot.val())
                });

               
                console.log(UserDataArray);
                console.log(UserDataArray.length);

                if(UserDataArray.length > 0){

                     if (this.password == UserDataArray[0].password) {
                        if (this.utype == UserDataArray[0].type) {
                            this.validUser = true;
                            window.localStorage.setItem('SessionName', UserDataArray[0].uname);
                            window.localStorage.setItem('SessionPassword', UserDataArray[0].password);
                            window.localStorage.setItem('SessionType', UserDataArray[0].type);
                            this.navCtrl.push(ResetPassword);
                        }else if(this.validUser == false){
                         this.alertMessage("Invalide Type");
                     }
                     }else if(this.validUser == false){
                         this.alertMessage("Invalide Password");
                     }

                }else if(UserDataArray.length <= 0 && this.validUser == false){
                    window.localStorage.setItem('SessionName', "");
                    window.localStorage.setItem('SessionPassword', "");
                    window.localStorage.setItem('SessionType', ""); 
                    this.alertMessage("Invalide User");
                }
               

            })
       } 
    }

}

    deleteMessage(id): Promise<any> {
        return new Promise((resolve) => {
            this.firelistRemoveBlock.remove(id).then(res => {
            });

            resolve(true);
        });
    }


}