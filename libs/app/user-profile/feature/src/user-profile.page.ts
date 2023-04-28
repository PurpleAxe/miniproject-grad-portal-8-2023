import { Component, Renderer2, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IProfile } from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { UserProfileState } from '@mp/app/user-profile/data-access';
import { SharedModule, SharedPageComponent } from '@mp/app/shared/feature'
// import { SharedModule } from '@mp/app/shared/feature';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '@mp/app/auth/util';
import { SubscribeToUserProfile } from '@mp/app/user-profile/util';//'../../util/src/user-profile.actions';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePageComponent implements OnInit{ 
  @Select(UserProfileState.userProfile) userProfile$!: Observable<IProfile | null>;
  shared : any;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(AuthState.user) authProfile$!: Observable<User | null>;

  profileURL = "https://ionicframework.com/docs/img/demos/avatar.svg";
  bannerURL = "assets/images/placeholder.jpg";
  displayName : any;
  userName : any;
  hrsTime:any;
  minutesTime:any;
  secondsTime:any;
  hoursString:any;
  minutesString:any;
  secondsString:any;

  constructor(private router: Router,private readonly store: Store,private renderer: Renderer2, private alertController: AlertController) {

    this.shared = new SharedPageComponent(new AlertController, store);

    // this.userProfile$.subscribe(userProfile => {
    //   if (userProfile) {
    //     this.hrsTime = this.getHours(userProfile);
    //     this.minutesTime = this.getMinutes(userProfile);
    //     this.secondsTime = this.getSeconds(userProfile);
    //   }
    // });
  


    // this.hoursString = `${this.hrsTime < 10 ? '0' : ''}${this.hrsTime} hrs`;
    // this.minutesString = `${this.minutesTime < 10 ? '0' : ''}${this.minutesTime} mins`;
    // this.secondsString = `${this.secondsTime < 10 ? '0' : ''}${this.secondsTime} s`;


    this.profile$.subscribe((profile)=>{
      console.log(profile);
    });

    this.authProfile$.subscribe((var2) => {
      if (var2) {
        if (var2.email) {
          this.userName = var2.email?.substring(
            0,
            var2.email.indexOf('@')
          );
        }

        if (var2.displayName) {
          this.displayName = var2.displayName;
        }else{
          this.displayName = "invalid";
        }

        if (var2.photoURL) {
          this.profileURL = var2.photoURL;
        }
      }

      
    });

    // if (this.time <= 0 || isNaN(this.time)) {
    //   console.log('The time has reached zero!');
    //   this.presentAlert();
    // }
   }

   async presentAlert() {
    const alert = await this.alertController.create({
    header: 'Time Out!',
    subHeader: 'Your time has run out.',
    message: 'You have run out of time. Your account is no longer in use.',
    buttons: [{
    text: 'LOGOUT',
    handler: () => {
    this.logout();
    }
    }],
    backdropDismiss: false // prevent dismissing by clicking outside of the alert
    });

    await alert.present();
  }

   logout() {
    // this.popover.dismiss();
    this.store.dispatch(new Logout());
  }

  //  async presentAlert() {
  //   const alert = await this.alertController.create({
  //   header: 'Time Out!',
  //   subHeader: 'Your time has run out.',
  //   message: 'You have run out of time. Your account is no longer in use.',
  //   buttons: [{
  //   text: 'LOGOUT',
  //   handler: () => {
  //   this.logout();
  //   }
  //   }],
  //   backdropDismiss: false // prevent dismissing by clicking outside of the alert
  //   });

  //   await alert.present();
  // }

   getSeconds(profile: IProfile){
    //SharedModule.se
    if (profile.timeLeft?.seconds!=undefined){
      const seconds = (profile.timeLeft?.seconds-Timestamp.now().seconds)%60;
      // console.log(profile.timeLeft?.seconds-Timestamp.now().seconds);
      // if (profile.timeLeft?.seconds-Timestamp.now().seconds<=0){
      //   this.presentAlert();
      // }
      // this.secondsString = `${seconds < 10 ? '0' : ''}${seconds} s`;
      return seconds;
    }
    return 0;
   }

   getMinutes(profile: IProfile){
    if (profile.timeLeft?.seconds!=undefined){
      const minutes = Math.floor(((profile.timeLeft?.seconds-Timestamp.now().seconds)%3600)/60);
      // this.minutesString = `${minutes < 10 ? '0' : ''}${minutes} mins`;
      return minutes;
    }
    return 0;
   }

   getHours(profile: IProfile){
    if (profile.timeLeft?.seconds!=undefined){
      const hours = Math.floor((profile.timeLeft?.seconds-Timestamp.now().seconds)/3600);
      // this.hoursString = `${hours < 10 ? '0' : ''}${hours} hrs`;
      return hours;
    }
    return 0;
   }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  checkFollowers(){
    // this.router.navigate(['followers']);
  }

  checkFollowing(){
    // this.router.navigate(['followers']);
  }

  
  

  ngOnInit() {
    this.store.dispatch(new SubscribeToUserProfile());
    console.log("in ngOnInit");
    console.log(this.userProfile$);
    console.log('UserProfilePageComponent');
  }

  ngOnDestroy() {
    clearTimeout(this.shared.timeoutId);
  }
}