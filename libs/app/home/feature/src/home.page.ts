import { Component, Renderer2, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { IProfile } from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { UserProfileState } from '@mp/app/user-profile/data-access';
import { SharedModule, SharedPageComponent } from '@mp/app/shared/feature';
// import { SharedModule } from '@mp/app/shared/feature';
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Logout, SubscribeToAuthState } from '@mp/app/auth/util';
import { SubscribeToUserProfile } from '@mp/app/user-profile/util'; //'../../util/src/user-profile.actions';
import { Timestamp } from '@angular/fire/firestore';
import { SubscribeToProfile } from '@mp/app/profile/util';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // @Select(UserProfileState.userProfile)

  userProfile$!: Observable<IProfile | null>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(AuthState.user) authProfile$!: Observable<User | null>;

  displayName: any;
  username: any;
  email: any;
  complete: any;
  iconColor: any;
  route: any;
  shared: any;
  hoursString = '';
  minutesString = '';
  secondsString = '';
  time: any;
  timestr: any;
  menuOpen = false;
  constructor(
    private router: Router,
    private readonly store: Store,
    private renderer: Renderer2,
    private alertController: AlertController,
    public menuCtrl?: MenuController
  ) {
    // this.profile$.subscribe((profile) => {
    //   console.log(profile, '[profileeeeeeeeeeeeeeee');
    // });
    // this.userProfile$.subscribe((profile) => {
    //   console.log(profile, '[userProfilezzzzzzzzz');
    // });
    // this.store.dispatch(new SubscribeToAuthState()).subscribe((authstate) => {
    // console.log(authstate, ' auth statettttttt');
    // });
    // this.store.dispatch(new SubscribeToProfile()).subscribe((profile) => {
    //   console.log(
    //     profile,
    //     ' profile gotasdjsajdsadtttttttzzzzzzzzzzzzzzzzzzzzzzz'
    //   );
    //   // this.userProfile = profile;
    // });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Time Out!',
      subHeader: 'Your time has run out.',
      message: 'Ask a friend to add more time for you.',
      buttons: ['Ask a friend'],
    });

    await alert.present();
  }

  ngOnInit() {
    // console.log('var2');
    // this.profile$.subscribe((user) => {
    // console.log(user, ' userrrrrrrrrrrrrrrrrrrrrrr');
    // });
    this.userProfile$ = this.store.select(ProfileState.profile);
    // .subscribe((x) => (this.userProfile = x));
    // this.store
    //   .select(ProfileState.profile)
    //   .subscribe((x) => (this.userProfile = x));

    this.shared = new SharedPageComponent(new AlertController(), this.store);

    this.shared.calculateTimeDifference();
    // this.shared.decreaseTime('hours', 'minutes', 'ses'); //It is no longer necessary to decrease the time since we have a due date from firestore.
    // this.shared.decreaseTime('hoursM', 'minutesM', 'sesM');

    this.authProfile$.subscribe((var2) => {
      if (var2) {
        if (var2.email) {
          this.email = var2.email;
          this.username = var2.email?.substring(0, var2.email.indexOf('@'));
        }

        if (var2.displayName) {
          this.displayName = var2.displayName;
        } else {
          this.displayName = 'invalid';
        }
      }

      //   this.profile$.subscribe((profile) => {
      //     if (
      //       profile?.accountDetails?.email === this.email &&
      //       profile?.accountDetails?.email
      //     ) {
      //       //something
      //     } else {
      //       // this.router.navigate(['home/settings/account-settings']);
      //       // this.presentAlert();
      //     }
      //   });
    });
    // console.log(
    //   this.userProfile,
    //   this.userProfile.timeLeft,
    //   'zllllllllllllllllllllllllllllllllll'
    // );
    // if (!this.userProfile$) {
    console.log('passing here');
    this.store
      .dispatch(new SubscribeToProfile())
      .pipe(
        tap(
          (x: any) =>
            (this.userProfile$ = this.store.select(ProfileState.profile))
        )
      );

    this.userProfile$.subscribe((x: any) => {
      const tamTime = x?.timeLeft.seconds;
      // this.userProfile.timeLeft
      // : '05/24/2023 22:59:30';
      // console.log(tamTime, 'taaaaaaaaaaaaaaaaaaaaaaaaaaaaaamTime');
      const referenceDate: number = tamTime;
      // console.log(referenceDate, 'refer date ;zzzzzzzzdeeeeeee');

      this.time = referenceDate - Math.floor(Date.now() / 1000);
      // console.log(this.time, 'time after timeeeeeeee');
      this.timeUpdateContinuously();
    });

    const colorTheme = localStorage.getItem('color-theme');

    if (colorTheme) {
      this.renderer.setAttribute(document.body, 'color-theme', colorTheme);
    }

    const activityStatusValue = localStorage.getItem('activityStatus');

    if (activityStatusValue === 'true') {
      this.iconColor = 'tertiary';
    } else {
      this.iconColor = 'danger';
    }
  }

  getSeconds(profile: IProfile) {
    //SharedModule.se
    if (profile.timeLeft?.seconds != undefined) {
      const seconds =
        (profile.timeLeft?.seconds - Timestamp.now().seconds) % 60;
      // console.log(profile.timeLeft?.seconds-Timestamp.now().seconds);
      // if (profile.timeLeft?.seconds-Timestamp.now().seconds<=0){
      //   this.presentAlert();
      // }
      return seconds;
    }
    return 0;
  }

  getMinutes(profile: IProfile) {
    if (profile.timeLeft?.seconds != undefined) {
      const minutes = Math.floor(
        ((profile.timeLeft?.seconds - Timestamp.now().seconds) % 3600) / 60
      );
      return minutes;
    }
    return 0;
  }

  getHours(profile: IProfile) {
    if (profile.timeLeft?.seconds != undefined) {
      const hours = Math.floor(
        (profile.timeLeft?.seconds - Timestamp.now().seconds) / 3600
      );
      return hours;
    }
    return 0;
  }

  async checkStatus() {
    console.log('checkStatus');
    this.store.dispatch(new SubscribeToProfile());
    // this.menuCtrl?.toggle();
    // console.log(await this.menuCtrl?.isOpen('menu'), 'is it open');
    if (await this.menuCtrl?.isOpen('menu')) {
      const activityStatusValue = localStorage.getItem('activityStatus');
      if (activityStatusValue === 'true') {
        this.iconColor = 'tertiary';
      } else {
        this.iconColor = 'danger';
      }
    }
  }
  logout() {
    // this.popover.dismiss();
    this.store.dispatch(new Logout());
  }

  goToSearch() {
    this.router.navigate(['/home/search']);
  }

  goToChat() {
    this.router.navigate(['/home/inbox']);
  }

  goToFeed() {
    this.router.navigate(['/home/feed']);
  }

  goToNotifications() {
    this.router.navigate(['/home/notifications']);
  }

  goToPost() {
    this.router.navigate(['/home/post']);
  }

  goToChallenge() {
    this.router.navigate(['/home/challenge']);
  }

  goToSettings() {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
    this.router.navigate(['/home/settings']);
  }

  goToProfile() {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
    this.router.navigate(['/home/profile']);
  }

  checkFollowers() {
    // this.router.navigate(['/home/challenge']);
  }
  checkFollowing() {
    // this.router.navigate(['/home/challenge']);
  }

  goToLeaderboard() {
    // this.router.navigate(['/home/challenge']);
  }

  goToMyProfile() {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }

    this.router.navigate(['/home/userprofile']);
  }
  timeUpdateContinuously() {
    //caden
    setInterval(() => {
      this.time--;

      const hours = Math.floor(this.time / 3600);
      const minutes = Math.floor((this.time % 3600) / 60);
      const seconds = Math.floor(this.time % 60);

      this.hoursString = `${hours < 10 ? '0' : ''}${hours} hrs`;
      this.minutesString = `${minutes < 10 ? '0' : ''}${minutes} mins`;
      this.secondsString = `${seconds < 10 ? '0' : ''}${seconds} s`;
    }, 1000);
  }

  // toDateTime(secs: any) {
  //   const t = new Date(secs * 1000);
  //   const today = new Date();
  //   // const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

  //   if (t.getDate() == today.getDate())
  //     return t.toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       hour12: false,
  //     });
  //   if (t.getDate() == yesterday.getDate()) return 'Yesterday';
  //   if (t.getDate() < yesterday.getDate()) return t.toDateString();

  //   return t;
  // }
  ngOnDestroy() {
    clearTimeout(this.shared.timeoutId);
  }
}
