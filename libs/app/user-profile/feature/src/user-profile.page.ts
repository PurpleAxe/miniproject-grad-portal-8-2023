import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePageComponent { 

  time = 88445;

  constructor(private router: Router) { }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  checkFollowers(){
    // this.router.navigate(['followers']);
  }

  checkFollowing(){
    // this.router.navigate(['followers']);
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
  
      const HElement = document.getElementById('hours');
      if (HElement) {
        HElement.textContent = `${hoursString}`;
      }
  
      const MElement = document.getElementById('minutes');
      if (MElement) {
        MElement.textContent = `${minutesString}`;
      }
  
      const SElement = document.getElementById('ses');
      if (SElement) {
        SElement.textContent = `${secondsString}`;
      }
  
      this.decreaseTime();
    }, 1000);
  }
  

  ngOnInit() {
    console.log('UserProfilePageComponent');
    localStorage.setItem('time', this.time.toString());
    this.decreaseTime();
  }
}
