import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Logout } from '@mp/app/auth/util';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  iconColor: any;
  timestr: any;

  time: number;

  hoursString = '';
  minutesString = '';
  secondsString = '';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private readonly store: Store,
    private menuCtrl?: MenuController
  ) {
    this.profile$.subscribe((profile) => {
      console.log(profile);
    });

    const referenceDate = Date.parse('04/24/2023 22:59:30') / 1000;


    this.time = Math.floor(Date.now() / 1000) - referenceDate;
    console.log(this.time);
    this.timeUpdateContinuously();
  }

  ngOnInit() {
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

    // this.time = parseInt(localStorage.getItem('time') || '0', 10);
    // console.log(this.time);

    // this.timestr = localStorage.getItem('time');
    // this.decreaseTime();
  }

  timeUpdateContinuously() {
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

  checkStatus() {
    console.log('checkStatus');
    const activityStatusValue = localStorage.getItem('activityStatus');
    if (activityStatusValue === 'true') {
      this.iconColor = 'tertiary';
    } else {
      this.iconColor = 'danger';
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
}
