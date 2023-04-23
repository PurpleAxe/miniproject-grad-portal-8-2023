import { Component, Renderer2 } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select} from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  iconColor: any;
  timestr : any;

  constructor(private router: Router, private renderer: Renderer2, private menuCtrl?: MenuController) {

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

    this.timestr = localStorage.getItem('time')
    this.decreaseTime();
  }

  

  decreaseTime(): void {
  setTimeout(() => {
    let time = parseInt(localStorage.getItem('time') || '0', 10);
    time--;
    localStorage.setItem('time', time.toString());

    // console.log(time);

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const hoursString = `${hours < 10 ? '0' : ''}${hours} hrs`;
    const minutesString = `${minutes < 10 ? '0' : ''}${minutes} mins`;
    const secondsString = `${seconds < 10 ? '0' : ''}${seconds} s`;

    const HElement = document.getElementById('hoursM');
    if (HElement) {
      HElement.textContent = `${hoursString}`;
    }

    const MElement = document.getElementById('minutesM');
    if (MElement) {
      MElement.textContent = `${minutesString}`;
    }

    const SElement = document.getElementById('sesM');
    if (SElement) {
      SElement.textContent = `${secondsString}`;
    }

    this.decreaseTime();
  }, 1000);
}

  checkStatus(){
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