import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { SubscribeToAuthState } from '@mp/app/auth/util';
import { AuthState } from '@mp/app/auth/data-access';
import { User } from '@angular/fire/auth';
import { Logout } from '@mp/app/auth/util';
import { SharedPageComponent } from '@mp/app/shared/feature'

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(AuthState.user) authProfile$!: Observable<User | null>;

  displayName = '';
  iconColor: any;
  shared = new SharedPageComponent(new AlertController);

  timestr: any;

  time: number;

  constructor(
    private router: Router,
    private readonly store: Store,
    private renderer: Renderer2,
    private menuCtrl?: MenuController
  ) {
    this.profile$.subscribe((profile)=>{
      console.log(profile);
    });

    const referenceDate = Date.parse('04/25/2023 12:00:30') / 1000;


    this.time =referenceDate - Math.floor(Date.now() / 1000) ;
    this.authProfile$.subscribe((var2) => {
      if (var2) {
        if (var2.email) {
          this.displayName = var2.email?.substring(
            0,
            var2.email.indexOf('@')
          );
        }
      }
    });
    // const referenceDate = Date.parse('05/24/2023 22:59:30')/1000;
    // this.time=referenceDate-Math.floor(Date.now()/1000);
    // console.log(this.time);
  }

  ngOnInit() {
    
    this.store.dispatch(new SubscribeToAuthState()).subscribe((authstate) => {
      
      console.log(authstate);
    });

    console.log('var2');
    this.profile$.subscribe((user) => {
      console.log(user);
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
    
    this.shared.decreaseTime('hoursM', 'minutesM', 'sesM');
    


  }

  

  checkStatus(){
      console.log('checkStatus');
      const activityStatusValue=localStorage.getItem('activityStatus');
      if(activityStatusValue==='true'){
        this.iconColor='tertiary';
      }else{
        this.iconColor='danger';
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

  ngOnDestroy() {
    clearTimeout(this.shared.timeoutId);
  }
}
